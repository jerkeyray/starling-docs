import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const hardShadow =
  'shadow-[6px_6px_0_0_var(--color-fd-foreground)] dark:shadow-[6px_6px_0_0_rgb(244_244_245)]';
const dotGrid =
  'bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px] text-fd-foreground/[0.06]';

type Feature = { title: string; body: string };
type Section = {
  tag: string;
  accent: 'cyan' | 'emerald';
  heading: string;
  lede: string;
  items: Feature[];
};

const sections: Section[] = [
  {
    tag: 'Audit & integrity',
    accent: 'cyan',
    heading: 'Every run is tamper-evident.',
    lede: 'Append-only event log. BLAKE3 hash chain. Merkle root committed in the terminal event.',
    items: [
      {
        title: 'Hash chain on append',
        body: 'Each event carries PrevHash = BLAKE3(canonical CBOR of prior event). Mutate any prior event and the chain breaks.',
      },
      {
        title: 'Merkle root commit',
        body: 'RunCompleted, RunFailed, and RunCancelled embed a Merkle root over every prior event. Sign it for cross-process attestation.',
      },
      {
        title: 'eventlog.Validate',
        body: 'Headless integrity check: seq monotonicity, hash chain, terminal placement, Merkle root, and semantic pairing rules.',
      },
      {
        title: 'Raw response digest',
        body: 'AssistantMessageCompleted carries the provider-supplied raw-response hash. Optional strict mode rejects empty digests.',
      },
      {
        title: 'Canonical CBOR',
        body: 'RFC 8949 §4.2: shortest integer form, sorted map keys, no indefinite-length items. The byte representation is deterministic.',
      },
    ],
  },
  {
    tag: 'Determinism & replay',
    accent: 'emerald',
    heading: 'Re-execute any run, byte-for-byte.',
    lede: 'Recorded side effects + deterministic loop = portable runs. Replay never re-contacts the provider.',
    items: [
      {
        title: 'starling.Replay',
        body: 'Re-runs the agent against a recorded log. The first event that does not byte-match surfaces as a typed Divergence.',
      },
      {
        title: 'step.Now & step.Random',
        body: 'Wall-clock and RNG are recorded once on the live run, returned from the log on replay.',
      },
      {
        title: 'step.SideEffect',
        body: 'Wrap any non-deterministic effect (HTTP, filesystem, MCP). Replay reads the recorded value, skips the closure.',
      },
      {
        title: 'Divergence type',
        body: 'replay.Divergence carries Seq, Kind, ExpectedKind, Class, and Reason. errors.Is + errors.As give you structured access.',
      },
      {
        title: 'Stream & inspector mode',
        body: 'replay.Stream yields a ReplayStep per event so the inspector can render recorded vs produced side-by-side.',
      },
    ],
  },
  {
    tag: 'Recovery',
    accent: 'cyan',
    heading: 'Resume a crashed run from its last seq.',
    lede: 'Reconstruct conversation state from the log, reissue pending tool calls, mark the boundary with a seam event.',
    items: [
      {
        title: 'Agent.Resume',
        body: 'Re-enters a run in a new process. Pending tool calls reissue under fresh CallIDs; orphaned schedules stay for audit.',
      },
      {
        title: 'RunResumed seam',
        body: 'A non-terminal event marking the boundary between processes. Carries AtSeq, ExtraMessage, ReissueTools, and PendingCalls.',
      },
      {
        title: 'WithReissueTools(false)',
        body: 'Refuse to re-fire pending tools, return ErrPartialToolCall instead. Use when tools are mutating and you want manual intervention.',
      },
      {
        title: 'Schema preflight',
        body: 'Run, Resume, and Replay all call eventlog.Preflight on startup. Stale or too-new schemas fail fast with a remediation message.',
      },
    ],
  },
  {
    tag: 'Cost control',
    accent: 'emerald',
    heading: 'Budgets enforced inside the runtime.',
    lede: 'Four axes. Inline checks, not after-the-fact dashboards. A trip emits BudgetExceeded and unwinds the run.',
    items: [
      {
        title: 'MaxInputTokens',
        body: 'Pre-call check before every step.LLMCall. Counts the planned prompt, refuses the call if it would exceed.',
      },
      {
        title: 'MaxOutputTokens',
        body: 'Mid-stream check on every ChunkUsage. Cancels the stream the moment the cap is crossed.',
      },
      {
        title: 'MaxUSD',
        body: 'Mid-stream USD enforcement using per-model prices. Per-model rates are configurable.',
      },
      {
        title: 'MaxWallClock',
        body: 'context.WithDeadline wrapping the run. The deadline triggers RunFailed{ErrorType:"budget", Limit:"wall_clock"}.',
      },
      {
        title: 'BudgetExceeded event',
        body: 'Emitted with limit, cap, actual, and where (pre_call | mid_stream | post_call) so post-mortems are exact.',
      },
    ],
  },
  {
    tag: 'Providers',
    accent: 'cyan',
    heading: 'Bring your model. Or all of them.',
    lede: 'Adapters share a streaming contract and a conformance suite. OpenAI-compatible endpoints plug in via WithBaseURL.',
    items: [
      {
        title: 'OpenAI adapter',
        body: 'Plus Groq, Together, Ollama, vLLM, LM Studio, Azure, anything else OpenAI-compatible.',
      },
      {
        title: 'Anthropic adapter',
        body: 'Tool use, extended thinking with per-block signatures, prompt caching metadata.',
      },
      {
        title: 'Gemini adapter',
        body: 'Native Google Gemini through the Google AI streaming API.',
      },
      {
        title: 'OpenRouter adapter',
        body: 'Thin wrapper over the OpenAI adapter with attribution headers and routing.',
      },
      {
        title: 'Conformance suite',
        body: 'Reusable harness in provider/conformance asserting request shape, chunk ordering, tool-call IDs, usage, and cancellation.',
      },
      {
        title: 'Capability declaration',
        body: 'provider.Capabler exposes which features each adapter supports. Tests skip what the adapter cannot do.',
      },
    ],
  },
  {
    tag: 'Tools',
    accent: 'emerald',
    heading: 'Typed Go tools. MCP for the rest.',
    lede: 'tool.Tool is one interface. tool.Typed derives JSON Schema from your input type. The MCP adapter mounts remote servers.',
    items: [
      {
        title: 'tool.Typed',
        body: 'Wrap a typed Go function as a Starling tool. JSON Schema is derived from the input type via reflection.',
      },
      {
        title: 'MCP adapter',
        body: 'Three transports: stdio subprocess, streamable HTTP, custom mcp.Transport. Calls route through step.SideEffect for replay safety.',
      },
      {
        title: 'Built-in tools',
        body: 'tool/builtin ships Fetch (15s timeout, 1 MiB cap) and ReadFile(baseDir) with path-escape rejection.',
      },
      {
        title: 'Idempotency & retry',
        body: 'step.ToolCall{Idempotent: true, MaxAttempts: N} retries on tool.ErrTransient. Same CallID, incrementing Attempt.',
      },
      {
        title: 'Per-call timeouts',
        body: 'WithCallTimeout on the MCP adapter; per-tool timeout via step.ToolCall on local tools.',
      },
    ],
  },
  {
    tag: 'Storage',
    accent: 'cyan',
    heading: 'Three backends. Same interface.',
    lede: 'In-memory for tests. SQLite for single-host. Postgres for multi-host. All three share the migration contract.',
    items: [
      {
        title: 'eventlog.NewInMemory',
        body: 'Tests, demos, ephemeral CLIs. Same EventLog interface, no persistence.',
      },
      {
        title: 'eventlog.NewSQLite',
        body: 'WAL mode, per-run _txlock=immediate. Auto-migrates on open. One writer, many readers.',
      },
      {
        title: 'eventlog.NewPostgres',
        body: 'Per-run advisory locks serialize appenders by run. Different runs are independent. PITR via WAL archiving.',
      },
      {
        title: 'Schema migrations',
        body: 'Forward-only, idempotent. CLI subcommands: starling migrate, starling schema-version. Preflight refuses stale or too-new schemas.',
      },
      {
        title: 'NDJSON export',
        body: 'starling export <db> <runID> dumps a run to portable NDJSON. Archive cold, delete hot.',
      },
      {
        title: 'RunLister',
        body: 'All three backends expose ListRuns for the inspector. Filter by status, model, time range.',
      },
    ],
  },
  {
    tag: 'Observability',
    accent: 'emerald',
    heading: 'Production-grade out of the box.',
    lede: 'Prometheus metrics, OpenTelemetry spans, structured slog. An embedded read-only web UI for runs, timelines, replays.',
    items: [
      {
        title: 'Prometheus metrics',
        body: 'starling.NewMetrics(reg) registers run, provider, tool, eventlog, and budget collectors. Histograms cover every hot path.',
      },
      {
        title: 'OpenTelemetry tracing',
        body: 'agent.run → agent.turn → provider.stream + step.tool. Wire any OTLP exporter; the runtime emits the spans.',
      },
      {
        title: 'Structured slog',
        body: 'Run lifecycle and divergence events emit slog records with stable fields. Plug your own handler.',
      },
      {
        title: 'Embedded inspector',
        body: 'Read-only HTTP UI. Runs list, per-run timeline, payload detail, live tail (SSE), replay controls, divergence rendering.',
      },
      {
        title: 'Bearer auth + CSRF',
        body: 'inspect.WithAuth + BearerAuth. CSRF protection on replay POST endpoints. Front with TLS for non-loopback access.',
      },
      {
        title: 'Dual-mode binary',
        body: 'Embed InspectCommand(factory) in your service binary so the inspector can replay against your live agent code.',
      },
    ],
  },
];

const accent = {
  cyan: {
    pill: 'bg-cyan-500',
    text: 'text-cyan-500',
    underline: 'bg-cyan-500',
    bar: 'bg-cyan-500',
    rule: 'border-cyan-500/30 dark:border-cyan-500/40',
  },
  emerald: {
    pill: 'bg-emerald-500',
    text: 'text-emerald-500',
    underline: 'bg-emerald-500',
    bar: 'bg-emerald-500',
    rule: 'border-emerald-500/30 dark:border-emerald-500/40',
  },
} as const;

export default function FeaturesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <SectionIndex />
      {sections.map((s, i) => (
        <FeatureSection key={s.tag} section={s} index={i} />
      ))}
      <CTA />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-fd-foreground/90">
      <div className={`pointer-events-none absolute inset-0 ${dotGrid}`} />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-[120%] -rotate-6 bg-cyan-500/10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-fd-foreground/90" />
      <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
        <h1 className="mb-5 text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Everything in the
          <br />
          <span className="relative inline-block text-cyan-500">
            runtime
            <span className="absolute -bottom-1 left-0 right-0 h-[5px] bg-cyan-500" />
          </span>
          .
        </h1>
        <p className="max-w-2xl text-balance text-base leading-relaxed text-fd-muted-foreground sm:text-lg">
          A flat list of what Starling actually ships. Eight categories,
          forty-odd features, all wired around the event log as source of truth.
        </p>
      </div>
    </section>
  );
}

function slug(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function SectionIndex() {
  return (
    <section className="border-b-2 border-fd-foreground/90 bg-fd-foreground/[0.02] px-5 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-fd-muted-foreground">
          Jump to
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] sm:text-sm">
          {sections.map((s, i) => {
            const a = accent[s.accent];
            return (
              <a
                key={s.tag}
                href={`#${slug(s.tag)}`}
                className="group inline-flex items-baseline gap-2 hover:text-fd-foreground"
              >
                <span className="text-fd-muted-foreground/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`size-1.5 translate-y-[-2px] ${a.bar}`} aria-hidden />
                <span className="font-bold text-fd-foreground transition group-hover:underline">
                  {s.tag}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeatureSection({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  const a = accent[section.accent];
  const flip = index % 2 === 1;
  return (
    <section
      id={slug(section.tag)}
      className="relative scroll-mt-20 overflow-hidden border-b-2 border-fd-foreground/90 px-5 py-14 sm:px-6 sm:py-20 odd:bg-fd-foreground/[0.02]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 sm:mb-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-end lg:gap-12">
          <div className={flip ? 'lg:order-2 lg:text-right' : ''}>
            <div className={`mb-4 flex items-center gap-3 ${flip ? 'lg:justify-end' : ''}`}>
              <span className="font-mono text-[11px] font-bold tracking-widest text-fd-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={`h-[3px] w-12 ${a.bar}`} aria-hidden />
              <span className={`text-[11px] font-bold uppercase tracking-widest ${a.text}`}>
                {section.tag}
              </span>
            </div>
            <h2 className="text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
              {section.heading}
            </h2>
          </div>
          <p
            className={`max-w-xl text-sm leading-relaxed text-fd-muted-foreground sm:text-base ${
              flip ? 'lg:order-1 lg:max-w-md' : ''
            }`}
          >
            {section.lede}
          </p>
        </div>

        <ul
          className={`grid gap-x-10 gap-y-0 border-t-2 ${a.rule} md:grid-cols-2`}
        >
          {section.items.map((it, i) => (
            <li
              key={it.title}
              className={`relative grid grid-cols-[auto_1fr] gap-x-4 border-b ${a.rule} py-5 sm:py-6`}
            >
              <span
                className="font-mono text-[11px] font-bold tracking-widest text-fd-muted-foreground/70"
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="mb-1.5 text-[15px] font-bold leading-tight sm:text-base">
                  <span className={`mr-2 inline-block size-1.5 align-middle ${a.bar}`} aria-hidden />
                  {it.title}
                </h3>
                <p className="text-sm leading-relaxed text-fd-muted-foreground">
                  {it.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden bg-fd-foreground/[0.02] px-5 py-16 sm:px-6 sm:py-20">
      <div className={`pointer-events-none absolute inset-0 ${dotGrid}`} />
      <div className="relative mx-auto flex max-w-4xl flex-col items-start gap-6 sm:items-center sm:text-center">
        <h2 className="text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
          Ship one. Replay forever.
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-fd-muted-foreground sm:text-base">
          The runtime is small on purpose. The wedge is production debugging
          via replay, not framework breadth.
        </p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            href="/docs/quickstart"
            className={`inline-flex items-center gap-2 border-2 border-fd-foreground bg-cyan-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${hardShadow}`}
          >
            Quickstart
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs/concepts"
            className={`inline-flex items-center gap-2 border-2 border-fd-foreground bg-fd-background px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${hardShadow}`}
          >
            Read concepts
          </Link>
        </div>
      </div>
    </section>
  );
}
