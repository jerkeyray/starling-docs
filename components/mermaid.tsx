'use client';

import { useEffect, useId, useState } from 'react';

interface MermaidProps {
  chart: string;
}

function detectDark(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

// Technical-drawing palette: outline-only shapes, transparent fills,
// one muted color across every shape including cylinders. Reads as a
// hand-drawn diagram, not a PowerPoint org chart.
const palette = {
  light: {
    bg: 'transparent',
    nodeBg: 'transparent',
    nodeStroke: '#94a3b8',
    nodeText: '#0f172a',
    edge: '#94a3b8',
    accent: '#06b6d4',
    accentSoft: 'transparent',
    success: '#10b981',
    successSoft: 'transparent',
    danger: '#f43f5e',
  },
  dark: {
    bg: 'transparent',
    nodeBg: 'transparent',
    nodeStroke: '#52525b',
    nodeText: '#e4e4e7',
    edge: '#71717a',
    accent: '#22d3ee',
    accentSoft: 'transparent',
    success: '#34d399',
    successSoft: 'transparent',
    danger: '#fb7185',
  },
};

const themeCSS = (p: typeof palette.light) => `
  /* Uniform outline-only shapes. Transparent fills, hairline strokes,
     no shadow, no rounded fills. Cylinders, rects, diamonds all match. */
  .node rect, .node polygon, .node circle, .node ellipse, .node path,
  .node .basic.label-container {
    stroke: ${p.nodeStroke} !important;
    stroke-width: 1px !important;
    fill: transparent !important;
    filter: none !important;
    rx: 4px;
    ry: 4px;
  }
  .node .label, .nodeLabel, .edgeLabel {
    font-family: var(--font-inter, ui-sans-serif, system-ui, sans-serif) !important;
    font-size: 12.5px !important;
    font-weight: 500 !important;
    color: ${p.nodeText} !important;
    fill: ${p.nodeText} !important;
  }
  /* htmlLabels=true renders edge labels inside foreignObject as
     <span class="edgeLabel"><p>...</p></span>. Reach into all three
     so the bright default fills don't survive. */
  .edgeLabel,
  .edgeLabel span,
  .edgeLabel p,
  .edgeLabel foreignObject div {
    background: transparent !important;
    background-color: transparent !important;
    padding: 0 6px !important;
    font-size: 11.5px !important;
    font-weight: 500 !important;
    color: ${p.edge} !important;
    fill: ${p.edge} !important;
  }
  .edgeLabel rect { fill: transparent !important; }
  .edgeLabel-container { background: transparent !important; }
  .edgePath .path {
    stroke-width: 1px !important;
    stroke: ${p.edge} !important;
  }
  .edgePath marker path, .marker path {
    fill: ${p.edge} !important;
    stroke: ${p.edge} !important;
  }
  .cluster rect {
    stroke: ${p.nodeStroke} !important;
    stroke-width: 1px !important;
    stroke-dasharray: 3 3;
    fill: transparent !important;
    rx: 4px; ry: 4px;
    opacity: 0.6;
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
          background: 'transparent',
          primaryColor: 'transparent',
          primaryBorderColor: p.nodeStroke,
          primaryTextColor: p.nodeText,
          secondaryColor: 'transparent',
          secondaryBorderColor: p.nodeStroke,
          tertiaryColor: 'transparent',
          tertiaryBorderColor: p.nodeStroke,
          lineColor: p.edge,
          textColor: p.nodeText,
          mainBkg: 'transparent',
          nodeBorder: p.nodeStroke,
          clusterBkg: 'transparent',
          clusterBorder: p.nodeStroke,
          // sequence diagram
          actorBkg: 'transparent',
          actorBorder: p.nodeStroke,
          actorTextColor: p.nodeText,
          actorLineColor: p.edge,
          signalColor: p.nodeText,
          signalTextColor: p.nodeText,
          labelBoxBkgColor: 'transparent',
          labelBoxBorderColor: p.nodeStroke,
          labelTextColor: p.nodeText,
          loopTextColor: p.nodeText,
          noteBkgColor: 'transparent',
          noteBorderColor: p.nodeStroke,
        },
        flowchart: {
          curve: 'basis',
          padding: 14,
          nodeSpacing: 40,
          rankSpacing: 56,
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
    <div className="not-prose my-8">
      <div
        className="flex justify-center overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
