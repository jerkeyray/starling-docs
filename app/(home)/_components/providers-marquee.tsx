// In-tree adapters live under provider/* in github.com/jerkeyray/starling.
// Groq/Together/Ollama/vLLM/LM Studio/Azure reach Starling through provider/openai
// with a custom BaseURL — they are not separate adapters and are mentioned in the caption.
// MCP is a tool subsystem (toolmcp), not a provider.
const ADAPTERS = ['OpenAI', 'Anthropic', 'Gemini', 'Bedrock', 'OpenRouter'];

export function ProvidersMarquee() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-1">
      {ADAPTERS.map((p) => (
        <span
          key={p}
          className="adapter inline-flex items-center gap-1.5 border-2 border-fd-foreground bg-fd-foreground/[0.04] px-3 py-1.5 font-mono text-[12px] font-extrabold uppercase tracking-[0.06em] shadow-[3px_3px_0_0_rgb(244_244_245)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-fd-foreground hover:text-fd-background hover:shadow-none"
        >
          <span className="block size-1.5 rounded-full bg-emerald-400" />
          {p}
        </span>
      ))}
    </div>
  );
}
