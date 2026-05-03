import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Boxes,
  ChevronDown,
  CircuitBoard,
  Coffee,
  Plug,
  Rewind,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { author, gitConfig } from '@/lib/shared';
import { Reveal } from './_components/reveal';
import { EventLog, type EventTimelineItem } from './_components/event-log';
import { InstallCommand } from './_components/install-command';
import { MerkleViz } from './_components/merkle-viz';
import { ProvidersMarquee } from './_components/providers-marquee';

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
    title: 'Replay any past run',
    body: 'Re-run a recorded run against your current code. The first step that behaves differently shows up as a test failure.',
  },
  {
    icon: ShieldCheck,
    title: 'Audit-grade history',
    body: 'Each run is hash-signed end to end. If anyone edits a past event, validation breaks and you know.',
  },
  {
    icon: CircuitBoard,
    title: 'Use any model',
    body: 'OpenAI, Anthropic, Gemini, Bedrock, OpenRouter, and any OpenAI-compatible endpoint. Swap models without touching agent code.',
  },
  {
    icon: Plug,
    title: 'Tools and MCP',
    body: 'Write tools as plain Go functions, or mount any MCP server. Both behave the same in live runs and in replay.',
  },
  {
    icon: Wallet,
    title: 'Hard cost limits',
    body: "Cap tokens, dollars, and wall-clock per run. The runtime stops when a cap trips - not after the bill arrives.",
  },
  {
    icon: Boxes,
    title: 'Production basics, included',
    body: 'Postgres or SQLite storage, schema migrations, Prometheus metrics, structured logs, and a built-in web inspector.',
  },
];

const eventTimeline: EventTimelineItem[] = [
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

// Manga-style hard offset shadow. Two-tone, no blur.
const hardShadow =
  'shadow-[6px_6px_0_0_var(--color-fd-foreground)] dark:shadow-[6px_6px_0_0_rgb(244_244_245)]';
const hardShadowSm =
  'shadow-[4px_4px_0_0_var(--color-fd-foreground)] dark:shadow-[4px_4px_0_0_rgb(244_244_245)]';

// Subtle dot grid evoking manga panel paper.
const dotGrid =
  'bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px] text-fd-foreground/[0.06]';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Starling',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Linux, macOS, Windows',
      programmingLanguage: 'Go',
      description:
        'A Go runtime for LLM agents where every run is recorded as a hash-chained event log. Replayable, auditable, and budget-bounded.',
      url: 'https://starling.jerkeyray.com',
      codeRepository: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
      license: 'https://opensource.org/licenses/MIT',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: {
        '@type': 'Person',
        name: 'aditya srivastava',
        url: 'https://jerkeyray.com',
      },
    },
    {
      '@type': 'WebSite',
      name: 'Starling',
      url: 'https://starling.jerkeyray.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://starling.jerkeyray.com/docs?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Hero />
      <FeatureGrid />
      <RunFlow />
      <HowItWorks />
      <Providers />
      <OpenSource />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden border-b border-fd-foreground/15 lg:min-h-[calc(85svh-56px)]">
      <div className={`pointer-events-none absolute inset-0 dot-drift ${dotGrid}`} />
      {/* subtle accent stripes */}
      <div className="stripe" aria-hidden />
      <div className="stripe stripe-2" aria-hidden />

      <a
        href="#what-you-get"
        aria-label="Scroll to features"
        className="hero-scroll-cue absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 items-center justify-center text-fd-muted-foreground transition hover:text-fd-foreground sm:bottom-7 lg:flex"
      >
        <ChevronDown className="size-5" aria-hidden />
      </a>

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:py-20">
        <div>
          <h1 className="mb-5 text-4xl font-black leading-[1.05] tracking-tight sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
            event-sourced
            <br />
            agent runtime
            <br />
            in{' '}
            <span className="relative inline-block text-cyan-500">
              Go
              <span className="hl-bar absolute -bottom-1 left-0 right-0 h-[5px] bg-cyan-500" />
            </span>
          </h1>
          <p className="mb-7 max-w-xl text-balance text-base leading-relaxed text-fd-muted-foreground sm:mb-8 sm:text-lg">
            replay past runs. resume crashed ones. stop runaway costs.
          </p>
          <InstallCommand />
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/why-starling"
              className={`inline-flex items-center gap-2 border-2 border-fd-foreground bg-cyan-500 px-4 py-2 text-sm font-bold text-white transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none sm:px-5 sm:py-2.5 sm:text-base ${hardShadow}`}
            >
              why starling
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <EventLog timeline={eventTimeline} />
      </div>
    </section>
  );
}

function Providers() {
  return (
    <section className="border-b border-fd-foreground/15 bg-fd-foreground/[0.02] px-5 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-center font-mono text-[11px] font-extrabold uppercase tracking-[0.08em] text-fd-muted-foreground sm:mb-5 sm:text-xs">
            in-tree adapters
          </p>
        </Reveal>
        <ProvidersMarquee />
        <p className="mx-auto mt-5 max-w-2xl text-center text-[12.5px] leading-relaxed text-fd-muted-foreground/80 sm:mt-6">
          OpenAI-compatible endpoints (Groq, Together, Ollama, vLLM, LM Studio,
          Azure OpenAI, …) plug in via{' '}
          <code className="font-mono text-fd-foreground">
            openai.WithBaseURL
          </code>
          .
        </p>
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="what-you-get" className="scroll-mt-16 border-b border-fd-foreground/15 px-5 py-10 sm:px-6 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 sm:mb-10">
          <Reveal className="max-w-2xl">
            <span className="mb-3 inline-block border-2 border-fd-foreground bg-cyan-500 px-3 py-1 text-[11px] font-bold tracking-wide text-white sm:text-xs">
              what you get
            </span>
            <h2 className="mb-2 text-2xl font-black leading-[1.1] tracking-tight sm:text-3xl md:text-4xl">
              what you get without writing it yourself.
            </h2>
            <p className="text-sm text-fd-muted-foreground">
              Replay, audit, multi-provider, MCP, budgets, and operator
              tooling - all in the box, with one Go import.
            </p>
          </Reveal>
        </div>
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={(i % 3) * 60}>
              <div
                className={`group relative overflow-hidden border-2 border-fd-foreground bg-fd-background p-4 transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${hardShadowSm}`}
              >
                <span className="feat-sweep" aria-hidden />
                <div className="mb-2 inline-flex size-8 items-center justify-center border-2 border-fd-foreground bg-cyan-500/15">
                  <Icon className="size-4 text-cyan-600 dark:text-cyan-300" strokeWidth={2.25} />
                </div>
                <h3 className="mb-1.5 text-sm font-bold">{title}</h3>
                <p className="text-[13px] leading-relaxed text-fd-muted-foreground">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RunFlow() {
  const steps: Array<{
    n: string;
    accent: 'cyan' | 'emerald';
    title: string;
    body: string;
    eventHints: string[];
  }> = [
    {
      n: '01',
      accent: 'cyan',
      title: 'define',
      body: 'Wire up the agent. Pick a model, give it tools, set a budget. No I/O yet.',
      eventHints: ['model', 'tools', 'budget'],
    },
    {
      n: '02',
      accent: 'cyan',
      title: 'run',
      body: 'Call Run with a goal. The runtime mints a run id and starts recording from the first byte.',
      eventHints: ['fresh run id', 'recording started'],
    },
    {
      n: '03',
      accent: 'cyan',
      title: 'loop',
      body: 'The model thinks, calls tools, reads the results, thinks again. Every step lands in the recording as it happens.',
      eventHints: ['turns', 'tool calls', 'tokens'],
    },
    {
      n: '04',
      accent: 'cyan',
      title: 'finish',
      body: 'When the run ends, the recording is sealed and signed. You can prove later that nothing was edited.',
      eventHints: ['final answer', 'signed history'],
    },
    {
      n: '05',
      accent: 'cyan',
      title: 'replay',
      body: 'Re-run the recording against your current code. Any difference shows up as a typed error pointing at the exact step.',
      eventHints: ['same wiring', 'diff at exact step'],
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-fd-foreground/15 px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <span className="mb-3 inline-block border-2 border-fd-foreground bg-emerald-500 px-3 py-1 text-[11px] font-bold tracking-wide text-white sm:mb-4 sm:text-xs">
            how a run flows
          </span>
          <h2 className="mb-3 text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            five phases,
            <br className="hidden sm:inline" />{' '}
            start to finish.
          </h2>
          <p className="text-sm text-fd-muted-foreground sm:text-base">
            From a goal in to a verified answer out - every step recorded
            in order, replayable later.
          </p>
        </Reveal>

        <ol className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => {
            const accentBar =
              s.accent === 'cyan' ? 'bg-cyan-500' : 'bg-emerald-500';
            const accentText =
              s.accent === 'cyan' ? 'text-cyan-500' : 'text-emerald-500';
            const isLast = i === steps.length - 1;
            return (
              <Reveal key={s.n} as="li" delay={i * 80}>
                <div
                  className={`relative flex h-full flex-col gap-3 overflow-hidden border-2 border-fd-foreground bg-fd-background p-5 ${hardShadowSm}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-2xl font-black ${accentText}`}>
                      {s.n}
                    </span>
                    <span className={`h-[3px] w-8 ${accentBar}`} aria-hidden />
                  </div>
                  <h3 className="text-base font-bold leading-tight">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-fd-muted-foreground">
                    {s.body}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {s.eventHints.map((h) => (
                      <span
                        key={h}
                        className="inline-block font-mono text-[11px] font-medium text-fd-muted-foreground"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  {!isLast && (
                    <>
                      <span className="phase-connector hidden lg:block" aria-hidden />
                      <span
                        className={`phase-ping hidden lg:block ${
                          s.accent === 'emerald' ? 'emerald' : ''
                        }`}
                        aria-hidden
                      />
                    </>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-b border-fd-foreground/15 bg-fd-foreground/[0.02] px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
      <div className={`pointer-events-none absolute inset-0 dot-drift ${dotGrid}`} />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <span className="mb-3 inline-block border-2 border-fd-foreground bg-emerald-500 px-3 py-1 text-[11px] font-bold tracking-wide text-white sm:mb-4 sm:text-xs">
            how it works
          </span>
          <h2 className="mb-5 text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            every meaningful runtime action is an{' '}
            <span className="relative inline-block text-emerald-500">
              event
              <span className="hl-bar absolute -bottom-1 left-0 right-0 h-[5px] bg-emerald-500" />
            </span>
            .
          </h2>
          <p className="mb-4 text-sm text-fd-muted-foreground sm:text-base">
            Starling treats the event log as the source of truth. The runtime,
            the inspector, and replay verification all read the same shape.
          </p>
          <p className="mb-4 text-sm text-fd-muted-foreground sm:text-base">
            Every event is hash-chained on append. The terminal event commits a
            Merkle root over all priors. Mutate any prior event and{' '}
            <code className="whitespace-nowrap font-mono text-[12.5px] text-fd-foreground sm:text-[13.5px]">
              eventlog.Validate
            </code>{' '}
            fails.
          </p>
          <p className="text-sm text-fd-muted-foreground sm:text-base">
            Replay re-executes the agent against the same wiring. The first event
            that does not byte-match surfaces as a typed{' '}
            <code className="whitespace-nowrap font-mono text-[12.5px] text-fd-foreground sm:text-[13.5px]">
              replay.Divergence
            </code>{' '}
            carrying seq, kind, expected kind, class, and reason.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <MerkleViz />
        </Reveal>
      </div>
    </section>
  );
}

function OpenSource() {
  return (
    <section className="relative overflow-hidden border-b border-fd-foreground/15 bg-fd-background px-5 py-14 sm:px-6 sm:py-20">
      <div className={`pointer-events-none absolute inset-0 dot-drift ${dotGrid}`} />
      <div className="stripe stripe-2" aria-hidden />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <span
            className={`mb-4 inline-flex items-center gap-2 border-2 border-fd-foreground bg-fd-background px-3 py-1 text-[11px] font-bold tracking-wide text-fd-foreground sm:mb-5 sm:text-xs ${hardShadowSm}`}
          >
            <span className="pulse-dot" aria-hidden />
            <span>open source</span>
          </span>
          <h2 className="mb-4 text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            contributions{' '}
            <span className="relative inline-block text-emerald-500">
              welcome
              <span className="hl-bar absolute -bottom-1 left-0 right-0 h-[5px] bg-emerald-500" />
            </span>
            .
          </h2>
          <p className="mx-auto mb-7 max-w-xl text-sm leading-relaxed text-fd-muted-foreground sm:mb-8 sm:text-base">
            issues, pull requests, and design discussions are genuinely
            appreciated. star the repo to follow along.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href={repoURL}
              className={`inline-flex items-center gap-2 border-2 border-fd-foreground bg-fd-background px-4 py-2 text-sm font-bold transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none sm:px-5 sm:py-2.5 sm:text-base ${hardShadow}`}
            >
              <GithubMark className="size-4" />
              star on github
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const linkCls =
    'inline-flex items-center gap-2 font-bold text-fd-muted-foreground transition hover:text-fd-foreground';
  return (
    <footer className="border-t border-fd-foreground/15 bg-fd-background px-5 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>
            built by{' '}
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
        <div className="flex items-center gap-5 sm:gap-6">
          <Link
            href="https://buymeacoffee.com/jerkeyray"
            className={linkCls}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Coffee className="size-4" aria-hidden />
            support the project
          </Link>
        </div>
      </div>
    </footer>
  );
}
