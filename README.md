<div align="center">

```text
███████╗████████╗ █████╗ ██████╗ ██╗     ██╗███╗   ██╗ ██████╗
██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██║     ██║████╗  ██║██╔════╝
███████╗   ██║   ███████║██████╔╝██║     ██║██╔██╗ ██║██║  ███╗
╚════██║   ██║   ██╔══██║██╔══██╗██║     ██║██║╚██╗██║██║   ██║
███████║   ██║   ██║  ██║██║  ██║███████╗██║██║ ╚████║╚██████╔╝
╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝
```

**Docs for the event-sourced agent runtime for Go**

Replayable runs · Tamper-evident logs · Provider-neutral tools · Production debugging

</div>

Documentation site for [Starling](https://github.com/jerkeyray/starling) —
a Go runtime for building LLM agents where every run is recorded as an
append-only, BLAKE3-chained, Merkle-rooted event log. When an agent fails
in production, you can inspect the log, replay it against the same agent
wiring, and see exactly where today's behavior diverges from the original
recording.

## What's here

- **Quickstart** — hello agent in five minutes.
- **Build with Starling** — first agent, tools, providers, persistence, budgets.
- **Replay-driven tests** — capture a run once, assert byte-identity in CI.
- **For AI agents** — a single self-contained markdown block for Claude/Cursor/etc.
- **Reference** — per-package types, signatures, examples.
- **Operations** — deployment, security, retention, metrics, tracing.

Visit the published site or browse `content/docs/` for the source.
