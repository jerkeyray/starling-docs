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

const features: Array<{ icon: typeof Rewind; title: string; body: string }> = [
  {
    icon: Rewind,
    title: 'Replayable runs',
    body: 'Every run is a hash-chained event log. Replay byte-for-byte against the same agent wiring; divergence is a typed error.',
  },
  {
    icon: ShieldCheck,
    title: 'Tamper-evident',
    body: 'BLAKE3 chain plus a Merkle root in the terminal event. Mutate any prior event and validation fails.',
  },
  {
    icon: CircuitBoard,
    title: 'Provider-neutral',
    body: 'OpenAI-compatible, Anthropic, Gemini, OpenRouter. Adapters share a conformance suite.',
  },
  {
    icon: Plug,
    title: 'MCP-ready',
    body: 'Mount remote MCP server tools as ordinary Starling tools. Calls route through step.SideEffect.',
  },
  {
    icon: Wallet,
    title: 'Cost control',
    body: 'Token, USD, and wall-clock budgets enforced inside the runtime, not observed after the fact.',
  },
  {
    icon: Boxes,
    title: 'Operator-shaped',
    body: 'Migrations, durable Postgres + SQLite, structured slog, Prometheus metrics, an inspector UI.',
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

const tagStyle: Record<typeof eventTimeline[number]['tag'], string> = {
  lifecycle: 'text-cyan-600 dark:text-cyan-300',
  turn: 'text-zinc-600 dark:text-zinc-300',
  tool: 'text-emerald-600 dark:text-emerald-300',
  terminal: 'text-rose-600 dark:text-rose-300',
};

// Manga-style hard offset shadow. Two-tone, no blur.
const hardShadow =
  'shadow-[6px_6px_0_0_var(--color-fd-foreground)] dark:shadow-[6px_6px_0_0_rgb(244_244_245)]';
const hardShadowSm =
  'shadow-[4px_4px_0_0_var(--color-fd-foreground)] dark:shadow-[4px_4px_0_0_rgb(244_244_245)]';

// Subtle dot grid evoking manga panel paper.
const dotGrid =
  'bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px] text-fd-foreground/[0.06]';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Providers />
      <FeatureGrid />
      <HowItWorks />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-56px)] items-center overflow-hidden border-b-2 border-fd-foreground/90">
      <div className={`pointer-events-none absolute inset-0 ${dotGrid}`} />
      {/* diagonal accent stripe (manga panel break) */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-[120%] -rotate-6 bg-cyan-500/10 dark:bg-cyan-500/[0.08]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-fd-foreground/90" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:py-20">
        <div>
          <Link
            href={repoURL}
            className={`mb-7 inline-flex items-center gap-2 border-2 border-fd-foreground bg-fd-background px-3 py-1 text-xs font-bold uppercase tracking-wider text-fd-foreground transition hover:bg-cyan-500 hover:text-white ${hardShadowSm}`}
          >
            <GithubMark className="size-3.5" />
            <span>Pre-release · Go 1.26+</span>
          </Link>
          <h1 className="mb-6 text-balance text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Event-sourced
            <br />
            agent runtime
            <br />
            for{' '}
            <span className="relative inline-block text-cyan-500">
              Go
              <span className="absolute -bottom-1 left-0 right-0 h-[5px] bg-cyan-500" />
            </span>
            .
          </h1>
          <p className="mb-9 max-w-xl text-balance text-lg leading-relaxed text-fd-muted-foreground">
            Every run is replayable, auditable, and cost-enforceable. When an
            agent fails in production, replay the log and see the exact step
            today&apos;s behavior{' '}
            <span className="bg-rose-500/15 px-1.5 py-0.5 font-bold text-rose-600 dark:text-rose-300">
              diverges
            </span>
            .
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/docs/quickstart"
              className={`inline-flex items-center gap-2 border-2 border-fd-foreground bg-cyan-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${hardShadow}`}
            >
              Quickstart
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/docs"
              className={`inline-flex items-center gap-2 border-2 border-fd-foreground bg-fd-background px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${hardShadow}`}
            >
              Docs
            </Link>
          </div>
        </div>
        <EventTimeline />
      </div>
    </section>
  );
}

function Providers() {
  const adapters = ['OpenAI', 'Anthropic', 'Gemini', 'OpenRouter', 'MCP'];
  return (
    <section className="border-b-2 border-fd-foreground/90 bg-fd-foreground/[0.02] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-widest text-fd-muted-foreground">
          In-tree adapters
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {adapters.map((p) => (
            <span
              key={p}
              className={`inline-flex items-center border-2 border-fd-foreground bg-fd-background px-3 py-1 font-mono text-[12px] font-bold uppercase tracking-wider transition hover:bg-fd-foreground hover:text-fd-background ${hardShadowSm}`}
            >
              {p}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-[11px] text-fd-muted-foreground/80">
          OpenAI-compatible endpoints (Groq, Together, Ollama, vLLM, Azure, …)
          plug in via <code className="font-mono">openai.WithBaseURL</code>.
        </p>
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section className="border-b-2 border-fd-foreground/90 px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <span className="mb-4 inline-block border-2 border-fd-foreground bg-cyan-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            What you get
          </span>
          <h2 className="mb-3 text-4xl font-black tracking-tight md:text-5xl">
            A Go runtime built around the log as
            <br />
            source of truth.
          </h2>
          <p className="text-fd-muted-foreground">
            Production-shaped from the start. Nothing about the design
            optimizes for demos.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className={`group relative border-2 border-fd-foreground bg-fd-background p-6 transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${hardShadowSm}`}
            >
              <div className="mb-4 inline-flex size-10 items-center justify-center border-2 border-fd-foreground bg-cyan-500/15">
                <Icon className="size-5 text-cyan-600 dark:text-cyan-300" strokeWidth={2.25} />
              </div>
              <h3 className="mb-2 text-base font-bold">{title}</h3>
              <p className="text-sm leading-relaxed text-fd-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-b-2 border-fd-foreground/90 bg-fd-foreground/[0.02] px-6 py-20 lg:py-24">
      <div className={`pointer-events-none absolute inset-0 ${dotGrid}`} />
      <div className="relative mx-auto max-w-3xl">
        <span className="mb-4 inline-block border-2 border-fd-foreground bg-emerald-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
          How it works
        </span>
        <h2 className="mb-5 text-4xl font-black tracking-tight md:text-5xl">
          Every meaningful runtime action is an{' '}
          <span className="relative inline-block text-emerald-500">
            event
            <span className="absolute -bottom-1 left-0 right-0 h-[5px] bg-emerald-500" />
          </span>
          .
        </h2>
        <p className="mb-4 text-fd-muted-foreground">
          Starling treats the event log as the source of truth. The runtime,
          the inspector, and replay verification all read the same shape.
        </p>
        <p className="mb-4 text-fd-muted-foreground">
          Every event is hash-chained on append. The terminal event commits a
          Merkle root over all priors. Mutate any prior event and{' '}
          <code className="border border-fd-foreground bg-fd-background px-1.5 py-0.5 font-mono text-[12.5px]">
            eventlog.Validate
          </code>{' '}
          fails.
        </p>
        <p className="mb-8 text-fd-muted-foreground">
          Replay re-executes the agent against the same wiring. The first event
          that does not byte-match surfaces as a typed{' '}
          <code className="border border-fd-foreground bg-fd-background px-1.5 py-0.5 font-mono text-[12.5px]">
            replay.Divergence
          </code>{' '}
          carrying seq, kind, expected kind, class, and reason.
        </p>
        <Link
          href="/docs/events"
          className="inline-flex items-center gap-2 border-b-2 border-fd-foreground pb-0.5 text-sm font-bold uppercase tracking-wider transition hover:text-emerald-600 dark:hover:text-emerald-300"
        >
          Read the event schema
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function EventTimeline() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 bg-emerald-500" />
      <div className="relative border-2 border-fd-foreground bg-fd-background">
        <div className="flex items-center justify-between border-b-2 border-fd-foreground bg-fd-foreground/5 px-4 py-2.5">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-fd-muted-foreground">
            run · 01HZ8…XKJ3 · 10 events
          </span>
          <span className="border-2 border-fd-foreground bg-emerald-500 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest text-white">
            ✓ Validated
          </span>
        </div>
        <ol className="divide-y-2 divide-fd-foreground/10 font-mono text-[12.5px]">
          {eventTimeline.map((ev) => (
            <li
              key={ev.seq}
              className="grid grid-cols-[2.5rem_1fr] items-center gap-3 px-4 py-2.5"
            >
              <span className="font-bold text-fd-muted-foreground">
                #{ev.seq.toString().padStart(2, '0')}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 truncate">
                <span className={`font-bold ${tagStyle[ev.tag]}`}>{ev.kind}</span>
                <span className="truncate text-fd-muted-foreground">{ev.note}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-fd-foreground/90 bg-fd-background px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-xs text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span>© {new Date().getFullYear()} Starling contributors.</span>
          <span className="text-fd-muted-foreground/50">·</span>
          <span>
            Built by{' '}
            <Link
              href={author.github}
              className="font-bold text-fd-foreground transition hover:text-cyan-600 dark:hover:text-cyan-300"
            >
              {author.name}
            </Link>
            {author.website ? (
              <>
                {' '}
                <span className="text-fd-muted-foreground/50">·</span>{' '}
                <Link
                  href={author.website}
                  className="font-bold text-fd-foreground transition hover:text-cyan-600 dark:hover:text-cyan-300"
                >
                  jerkeyray.com
                </Link>
              </>
            ) : null}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/docs" className="font-bold uppercase tracking-wider hover:text-fd-foreground">
            Docs
          </Link>
          <Link href="/docs/reference" className="font-bold uppercase tracking-wider hover:text-fd-foreground">
            Reference
          </Link>
          <Link href={repoURL} className="font-bold uppercase tracking-wider hover:text-fd-foreground">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
