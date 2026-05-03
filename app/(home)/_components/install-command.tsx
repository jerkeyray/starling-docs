'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const command = 'go get github.com/jerkeyray/starling';

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // navigator.clipboard can be unavailable on insecure contexts; ignore.
    }
  };

  return (
    <div className="mb-8 inline-flex items-center gap-3 border border-fd-border bg-fd-card px-4 py-2.5 font-mono text-[13px] sm:text-sm">
      <span className="select-none text-fd-muted-foreground">$</span>
      <code className="text-fd-foreground">{command}</code>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? 'Copied' : 'Copy install command'}
        className="ms-2 inline-flex size-6 items-center justify-center rounded-sm text-fd-muted-foreground transition hover:bg-fd-muted hover:text-fd-foreground"
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
      </button>
    </div>
  );
}
