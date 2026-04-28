import Link from 'next/link';
import {
  ArrowRight,
  Boxes,
  CircuitBoard,
  Plug,
  Rewind,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { author, gitConfig } from '@/lib/shared';

const repoURL = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

function GithubMark({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.9.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.95 10.95 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.07.78 2.16v3.21c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

const features: Array<{
  icon: typeof Rewind;
  title: string;
  body: string;
}> = [
  {
    icon: Rewind,
    title: 'Replayable runs',
    body: 'Every run is recorded as a hash-chained event log. Replay byte-for-byte against the same agent wiring; divergence is a typed error.',
  },
  {
    icon: ShieldCheck,
    title: 'Tamper-evident',
    body: 'BLAKE3 chain plus a Merkle root in the terminal event. Mutate any prior event and validation fails.',
  },
  {
    icon: CircuitBoard,
    title: 'Provider-neutral',
    body: 'OpenAI-compatible, Anthropic, Gemini, OpenRouter. Adapters share a conformance suite so streaming and tool-call shapes stay consistent.',
  },
  {
    icon: Plug,
    title: 'MCP-ready',
    body: 'Mount remote MCP server tools as ordinary Starling tools. Calls route through step.SideEffect so replay never re-contacts the server.',
  },
  {
    icon: Wallet,
    title: 'Cost control',
    body: 'Token, USD, and wall-clock budgets enforced inside the runtime, not observed after the fact. BudgetExceeded events are auditable.',
  },
  {
    icon: Boxes,
    title: 'Operator-shaped',
    body: 'Migrations, durable Postgres + SQLite backends, structured slog, Prometheus metrics, an inspector UI, OTel-friendly span tree.',
  },
];

const eventTimeline: Array<{
  seq: number;
  kind: string;
  tag: 'lifecycle' | 'turn' | 'tool' | 'terminal';
  note: string;
}> = [
  { seq: 1, kind: 'RunStarted', tag: 'lifecycle', note: 'model · tools · system prompt pinned' },
  { seq: 2, kind: 'TurnStarted', tag: 'turn', note: 'turn 1 · prompt hash committed' },
  { seq: 3, kind: 'AssistantMessageCompleted', tag: 'turn', note: 'tool plan: search · fetch' },
  { seq: 4, kind: 'ToolCallScheduled', tag: 'tool', note: 'search · attempt 1' },
  { seq: 5, kind: 'ToolCallScheduled', tag: 'tool', note: 'fetch · attempt 1' },
  { seq: 6, kind: 'ToolCallCompleted', tag: 'tool', note: 'search · 28ms' },
  { seq: 7, kind: 'ToolCallCompleted', tag: 'tool', note: 'fetch · 312ms' },
  { seq: 8, kind: 'TurnStarted', tag: 'turn', note: 'turn 2' },
  { seq: 9, kind: 'AssistantMessageCompleted', tag: 'turn', note: 'final answer' },
  { seq: 10, kind: 'RunCompleted', tag: 'terminal', note: 'merkle root committed' },
];

const tagStyle: Record<typeof eventTimeline[number]['tag'], { kind: string; pill: string; label: string }> = {
  lifecycle: {
    kind: 'text-cyan-600 dark:text-cyan-300',
    pill: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 ring-1 ring-cyan-500/30',
    label: 'lifecycle',
  },
  turn: {
    kind: 'text-zinc-700 dark:text-zinc-200',
    pill: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-300 ring-1 ring-zinc-500/20',
    label: 'turn',
  },
  tool: {
    kind: 'text-emerald-600 dark:text-emerald-300',
    pill: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30',
    label: 'tool',
  },
  terminal: {
    kind: 'text-rose-600 dark:text-rose-300',
    pill: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500/30',
    label: 'terminal',
  },
};

const heroSnippet = `import (
    starling "github.com/jerkeyray/starling"
    "github.com/jerkeyray/starling/eventlog"
    "github.com/jerkeyray/starling/provider/openai"
)

prov, _ := openai.New(openai.WithAPIKey(os.Getenv("OPENAI_API_KEY")))

a := &starling.Agent{
    Provider: prov,
    Log:      eventlog.NewSQLite("starling.db"),
    Config:   starling.Config{Model: "gpt-4o-mini", MaxTurns: 4},
}

res, err := a.Run(ctx, "Summarize today's incidents.")
// every prompt, tool call, and chunk lands in the log →
// replay it later, deterministically, against the same wiring`;

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Benchmarks />
      <Providers />
      <FeatureGrid />
      <HowItWorks />
      <Footer />
    </main>
  );
}

function Benchmarks() {
  const rows = [
    { value: '~1.7 µs', label: 'in-memory append' },
    { value: '~31 µs', label: 'SQLite append (WAL, single writer)' },
    { value: '~7.5 ms', label: 'full-run validate (10k events)' },
  ];
  return (
    <section className="border-b border-fd-border bg-fd-background px-6 py-10">
      <div className="mx-auto grid max-w-5xl gap-y-6 sm:grid-cols-3 sm:divide-x sm:divide-fd-border">
        {rows.map((r) => (
          <div key={r.label} className="px-6 text-center">
            <div className="font-mono text-2xl font-semibold tracking-tight text-cyan-600 dark:text-cyan-300">
              {r.value}
            </div>
            <div className="mt-1 text-xs text-fd-muted-foreground">
              {r.label}
            </div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-3xl text-center text-[11px] text-fd-muted-foreground/70">
        Apple Silicon · Go 1.26 · single-shot, ±20% noise. Re-run with{' '}
        <code className="font-mono">go test -bench=. -count=5 ./bench/</code>.
      </p>
    </section>
  );
}

function Providers() {
  const adapters = ['OpenAI', 'Anthropic', 'Gemini', 'OpenRouter', 'MCP'];
  return (
    <section className="border-b border-fd-border bg-fd-muted/15 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 text-center text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
          In-tree adapters
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {adapters.map((p) => (
            <span
              key={p}
              className="inline-flex items-center rounded-full border border-fd-border bg-fd-background px-3 py-1 font-mono text-[12px] text-fd-muted-foreground transition hover:border-cyan-500/40 hover:text-fd-foreground"
            >
              {p}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[11px] text-fd-muted-foreground/70">
          OpenAI-compatible endpoints (Groq, Together, Ollama, vLLM, Azure, …)
          plug in via{' '}
          <code className="font-mono">openai.WithBaseURL</code>.
        </p>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-fd-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(6,182,212,0.18),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(20,184,166,0.14),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:py-28">
        <div>
          <Link
            href={repoURL}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-700 transition hover:bg-cyan-500/15 dark:text-cyan-300"
          >
            <GithubMark className="size-3.5" />
            <span>Pre-release · Go 1.26+</span>
            <ArrowRight className="size-3.5" />
          </Link>
          <h1 className="mb-6 text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Event-sourced agent runtime for{' '}
            <span className="bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Go
            </span>
            .
          </h1>
          <p className="mb-8 max-w-xl text-balance text-lg text-fd-muted-foreground">
            Every run is replayable, auditable, and cost-enforceable. When an
            agent fails in production, replay the log and see exactly where
            today&apos;s behavior{' '}
            <span className="font-medium text-rose-600 dark:text-rose-300">
              diverges
            </span>
            .
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/docs/quickstart"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-cyan-500 to-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-cyan-500/25 transition hover:shadow-lg hover:shadow-cyan-500/35"
            >
              Quickstart
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-md border border-fd-border bg-fd-card px-5 py-2.5 text-sm font-medium transition hover:border-fd-accent hover:bg-fd-accent"
            >
              Read the docs
            </Link>
          </div>
        </div>
        <TerminalCard code={heroSnippet} />
      </div>
    </section>
  );
}

function TerminalCard({ code }: { code: string }) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/25 via-teal-500/15 to-emerald-500/15 blur-2xl" />
      <div className="relative rounded-xl border border-fd-border bg-fd-card shadow-2xl shadow-cyan-500/10">
        <div className="flex items-center gap-2 border-b border-fd-border px-4 py-3">
          <span className="size-2.5 rounded-full bg-rose-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 font-mono text-[11px] uppercase tracking-wider text-fd-muted-foreground">
            agent.go
          </span>
        </div>
        <pre className="overflow-x-auto p-5 text-[12.5px] leading-relaxed">
          <code className="font-mono text-fd-foreground/90">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function FeatureGrid() {
  return (
    <section className="px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <span className="mb-3 inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-700 ring-1 ring-cyan-500/30 dark:text-cyan-300">
            What you get
          </span>
          <h2 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
            A Go runtime built around the log as source of truth.
          </h2>
          <p className="text-fd-muted-foreground">
            Production-shaped from the start. Nothing about the design
            optimizes for demos.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-xl border border-fd-border bg-fd-card p-6 transition hover:border-cyan-500/40"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex flex-col gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-cyan-500/10 ring-1 ring-cyan-500/30">
                  <Icon className="size-4.5 text-cyan-600 dark:text-cyan-300" />
                </span>
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-fd-muted-foreground">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-y border-fd-border bg-fd-muted/20 px-6 py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(16,185,129,0.10),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <span className="mb-3 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300">
            How it works
          </span>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Every meaningful runtime action is an{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              event
            </span>
            .
          </h2>
          <p className="mb-4 text-fd-muted-foreground">
            Starling treats the event log as the source of truth. The runtime,
            the inspector, and replay verification all read the same shape.
          </p>
          <p className="mb-8 text-fd-muted-foreground">
            Hash-chained on append; Merkle-rooted on terminal. Replay diffs the
            re-executed agent against the recording and surfaces the first
            mismatch as a typed{' '}
            <code className="rounded bg-fd-card px-1.5 py-0.5 text-[12.5px] text-rose-600 dark:text-rose-300">
              replay.Divergence
            </code>
            .
          </p>
          <Link
            href="/docs/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition hover:underline dark:text-emerald-400"
          >
            Read the event schema
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <EventTimeline />
      </div>
    </section>
  );
}

function EventTimeline() {
  return (
    <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-xl shadow-cyan-500/5">
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/30 px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-fd-muted-foreground">
          run · 01HZ8…XKJ3 · 10 events
        </span>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300">
          ✓ Validated
        </span>
      </div>
      <ol className="divide-y divide-fd-border font-mono text-[12.5px]">
        {eventTimeline.map((ev) => {
          const t = tagStyle[ev.tag];
          return (
            <li
              key={ev.seq}
              className="grid grid-cols-[2.75rem_5.5rem_1fr] items-center gap-3 px-4 py-2.5"
            >
              <span className="text-fd-muted-foreground">
                #{ev.seq.toString().padStart(2, '0')}
              </span>
              <span
                className={`inline-flex justify-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${t.pill}`}
              >
                {t.label}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 truncate">
                <span className={`font-semibold ${t.kind}`}>{ev.kind}</span>
                <span className="truncate text-fd-muted-foreground">{ev.note}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-fd-border bg-fd-background px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-xs text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span>© {new Date().getFullYear()} Starling contributors.</span>
          <span className="text-fd-muted-foreground/50">·</span>
          <span>
            Built by{' '}
            <Link
              href={author.github}
              className="font-medium text-fd-foreground transition hover:text-cyan-500"
            >
              {author.name}
            </Link>
            {author.website ? (
              <>
                {' '}
                <span className="text-fd-muted-foreground/50">·</span>{' '}
                <Link
                  href={author.website}
                  className="font-medium text-fd-foreground transition hover:text-cyan-500"
                >
                  jerkeyray.com
                </Link>
              </>
            ) : null}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/docs" className="hover:text-fd-foreground">
            Docs
          </Link>
          <Link href="/docs/reference" className="hover:text-fd-foreground">
            Reference
          </Link>
          <Link href={repoURL} className="hover:text-fd-foreground">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
