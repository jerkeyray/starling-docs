// In-tree adapters live under provider/* in github.com/jerkeyray/starling.
// Groq/Together/Ollama/vLLM/LM Studio/Azure reach Starling through provider/openai
// with a custom BaseURL — they are not separate adapters and are mentioned in the caption.
// MCP is a tool subsystem (toolmcp), not a provider.

import type { ReactElement } from 'react';

type Adapter = {
  name: string;
  Icon: (props: { className?: string }) => ReactElement;
};

const cls = 'size-3.5 shrink-0';

const ADAPTERS: Adapter[] = [
  {
    name: 'OpenAI',
    Icon: ({ className = cls }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.142-.08 4.774-2.758a.795.795 0 0 0 .392-.681v-6.737l2.018 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.488 4.493zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.778 2.758a.769.769 0 0 0 .78 0l5.832-3.367v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.808 3.355-2.018 1.168a.077.077 0 0 1-.072 0l-4.83-2.786A4.5 4.5 0 0 1 2.34 7.872zm16.597 3.855L13.106 8.38l2.014-1.164a.077.077 0 0 1 .072 0l4.83 2.788a4.49 4.49 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.68zm2.01-3.024-.142-.087-4.77-2.785a.78.78 0 0 0-.785 0L9.409 9.23V6.897a.07.07 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: 'Anthropic',
    Icon: ({ className = cls }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48z" />
      </svg>
    ),
  },
  {
    name: 'Gemini',
    Icon: ({ className = cls }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M12 0c0 6.627-5.373 12-12 12 6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Bedrock',
    Icon: ({ className = cls }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" strokeLinecap="square" aria-hidden="true" className={className}>
        <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
        <path d="M3 7l9 4 9-4" />
        <path d="M12 11v10" />
      </svg>
    ),
  },
  {
    name: 'OpenRouter',
    Icon: ({ className = cls }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" strokeLinecap="square" aria-hidden="true" className={className}>
        <path d="M3 12h12" />
        <path d="M11 8l4 4-4 4" />
        <circle cx="19" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

export function ProvidersMarquee() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-1">
      {ADAPTERS.map(({ name, Icon }) => (
        <span
          key={name}
          className="adapter inline-flex items-center gap-2 border-2 border-fd-foreground bg-fd-foreground/[0.04] px-3 py-1.5 font-mono text-[12px] font-extrabold uppercase tracking-[0.06em] shadow-[3px_3px_0_0_rgb(244_244_245)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-fd-foreground hover:text-fd-background hover:shadow-none"
        >
          <Icon />
          {name}
        </span>
      ))}
    </div>
  );
}
