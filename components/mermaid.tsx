'use client';

import { useEffect, useId, useState } from 'react';

interface MermaidProps {
  chart: string;
}

function detectDark(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

// Brand-matched palette. Keep these the same across the site so the
// Mermaid output reads as part of the page, not a third-party widget.
const palette = {
  light: {
    bg: '#ffffff',
    nodeBg: '#f8fafc',
    nodeStroke: '#cbd5e1',
    nodeText: '#0f172a',
    edge: '#94a3b8',
    accent: '#06b6d4', // cyan
    accentSoft: '#cffafe',
    success: '#10b981', // emerald
    successSoft: '#d1fae5',
    danger: '#f43f5e', // rose
  },
  dark: {
    bg: 'transparent',
    nodeBg: '#1e293b',
    nodeStroke: '#475569',
    nodeText: '#e2e8f0',
    edge: '#64748b',
    accent: '#22d3ee',
    accentSoft: '#155e75',
    success: '#34d399',
    successSoft: '#065f46',
    danger: '#fb7185',
  },
};

const themeCSS = (p: typeof palette.light) => `
  .node rect, .node polygon, .node circle, .node ellipse, .node path {
    stroke-width: 1.2px;
    filter: drop-shadow(0 1px 2px rgba(15, 23, 42, 0.08));
  }
  .node .label, .nodeLabel, .edgeLabel {
    font-family: var(--font-inter, ui-sans-serif, system-ui, sans-serif) !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    color: ${p.nodeText} !important;
    fill: ${p.nodeText} !important;
  }
  .edgeLabel {
    background-color: ${p.bg === 'transparent' ? '#0b1220' : '#ffffff'} !important;
    padding: 0 4px !important;
    border-radius: 4px !important;
    font-size: 11.5px !important;
    color: ${p.edge} !important;
  }
  .edgeLabel rect { fill: ${p.bg === 'transparent' ? '#0b1220' : '#ffffff'}; }
  .edgePath .path {
    stroke-width: 1.4px !important;
    stroke: ${p.edge} !important;
  }
  .edgePath marker path, .marker path {
    fill: ${p.edge} !important;
    stroke: ${p.edge} !important;
  }
  .cluster rect {
    stroke: ${p.nodeStroke} !important;
    stroke-dasharray: 4 3;
    fill: transparent !important;
    rx: 10px; ry: 10px;
  }
  .cluster .nodeLabel, .cluster-label .nodeLabel {
    font-size: 11px !important;
    font-weight: 600 !important;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${p.edge} !important;
    fill: ${p.edge} !important;
  }
  /* sequence diagram */
  .actor {
    stroke: ${p.nodeStroke} !important;
    fill: ${p.nodeBg} !important;
    rx: 8px; ry: 8px;
  }
  text.actor > tspan {
    fill: ${p.nodeText} !important;
    font-weight: 600 !important;
  }
  .messageLine0, .messageLine1 {
    stroke: ${p.edge} !important;
    stroke-width: 1.4px !important;
  }
  .messageText {
    font-family: var(--font-inter, ui-sans-serif) !important;
    font-size: 12.5px !important;
    fill: ${p.nodeText} !important;
  }
  .loopLine {
    stroke: ${p.accent} !important;
  }
  .labelBox {
    stroke: ${p.accent} !important;
    fill: ${p.accentSoft} !important;
  }
  .labelText, .labelText > tspan {
    fill: ${p.nodeText} !important;
    font-weight: 600 !important;
  }
`;

export function Mermaid({ chart }: MermaidProps) {
  const id = useId().replace(/:/g, '');
  const [svg, setSvg] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    setIsDark(detectDark());
    const observer = new MutationObserver(() => setIsDark(detectDark()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mermaid = (await import('mermaid')).default;
      const p = isDark ? palette.dark : palette.light;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'strict',
        fontFamily: 'inherit',
        themeCSS: themeCSS(p),
        themeVariables: {
          background: p.bg,
          primaryColor: p.accentSoft,
          primaryBorderColor: p.accent,
          primaryTextColor: p.nodeText,
          secondaryColor: p.successSoft,
          secondaryBorderColor: p.success,
          tertiaryColor: p.nodeBg,
          tertiaryBorderColor: p.nodeStroke,
          lineColor: p.edge,
          textColor: p.nodeText,
          mainBkg: p.nodeBg,
          nodeBorder: p.nodeStroke,
          clusterBkg: 'transparent',
          clusterBorder: p.nodeStroke,
          // sequence diagram
          actorBkg: p.nodeBg,
          actorBorder: p.nodeStroke,
          actorTextColor: p.nodeText,
          actorLineColor: p.edge,
          signalColor: p.nodeText,
          signalTextColor: p.nodeText,
          labelBoxBkgColor: p.accentSoft,
          labelBoxBorderColor: p.accent,
          labelTextColor: p.nodeText,
          loopTextColor: p.nodeText,
          noteBkgColor: p.successSoft,
          noteBorderColor: p.success,
        },
        flowchart: {
          curve: 'basis',
          padding: 18,
          nodeSpacing: 36,
          rankSpacing: 48,
          htmlLabels: true,
          useMaxWidth: true,
        },
        sequence: {
          actorMargin: 60,
          boxMargin: 8,
          messageMargin: 32,
          mirrorActors: false,
          useMaxWidth: true,
        },
      });
      try {
        const { svg } = await mermaid.render(`m-${id}`, chart);
        if (!cancelled) setSvg(svg);
      } catch (e) {
        if (!cancelled) setErr(String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id, isDark]);

  if (err) {
    return (
      <pre className="overflow-x-auto rounded-md border border-rose-500/30 bg-rose-500/5 p-3 text-xs text-rose-600 dark:text-rose-300">
        mermaid render error: {err}
      </pre>
    );
  }
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-gradient-to-br from-fd-background to-fd-muted/20 p-6">
      <div
        className="flex justify-center overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
