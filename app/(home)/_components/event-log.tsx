'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

export type EventTimelineItem = {
  seq: number;
  kind: string;
  tag: 'lifecycle' | 'turn' | 'tool' | 'terminal';
  note: string;
};

const tagStyle: Record<EventTimelineItem['tag'], string> = {
  lifecycle: 'text-cyan-300',
  turn: 'text-zinc-200',
  tool: 'text-emerald-300',
  terminal: 'text-rose-300',
};

type Mode = 'live' | 'paused' | 'replay';

const TICK_MS = 520;
const FLASH_MS = 280;

export function EventLog({ timeline }: { timeline: EventTimelineItem[] }) {
  const total = timeline.length;
  const [visible, setVisible] = useState(0);
  const [mode, setMode] = useState<Mode>('live');
  const [diverged, setDiverged] = useState<number | null>(null);
  const [flashed, setFlashed] = useState<Set<number>>(() => new Set());

  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flashTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const visibleRef = useRef(visible);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  const clearTick = () => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  };
  const clearAll = useCallback(() => {
    clearTick();
  }, []);

  const flashRow = useCallback((seq: number) => {
    setFlashed((prev) => {
      const next = new Set(prev);
      next.add(seq);
      return next;
    });
    const existing = flashTimers.current.get(seq);
    if (existing) clearTimeout(existing);
    const t = setTimeout(() => {
      setFlashed((prev) => {
        const next = new Set(prev);
        next.delete(seq);
        return next;
      });
      flashTimers.current.delete(seq);
    }, FLASH_MS);
    flashTimers.current.set(seq, t);
  }, []);

  const startLive = useCallback(() => {
    clearAll();
    setMode('live');
    tickRef.current = setInterval(() => {
      const cur = visibleRef.current;
      if (cur >= total) {
        clearTick();
        setMode('paused');
        return;
      }
      const next = cur + 1;
      flashRow(next);
      setVisible(next);
    }, TICK_MS);
  }, [clearAll, flashRow, total]);

  useEffect(() => {
    const t = setTimeout(startLive, 600);
    return () => {
      clearTimeout(t);
      clearAll();
      flashTimers.current.forEach((handle) => clearTimeout(handle));
      flashTimers.current.clear();
    };
  }, [startLive, clearAll]);

  const togglePlayPause = useCallback(() => {
    if (mode === 'live') {
      clearAll();
      setMode('paused');
    } else if (mode === 'paused') {
      startLive();
    } else {
      // replay → keep paused at current scrub position
      clearAll();
      setMode('paused');
    }
  }, [mode, startLive, clearAll]);

  const rewind = useCallback(() => {
    clearAll();
    setDiverged(null);
    setVisible(0);
    startLive();
  }, [clearAll, startLive]);

  const scrubFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const n = Math.round(pct * total);
      clearAll();
      setMode('replay');
      setDiverged(null);
      setVisible(n);
    },
    [clearAll, total],
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    scrubFromClientX(e.clientX);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    scrubFromClientX(e.clientX);
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  const pct = (visible / total) * 100;
  const counterText = `${String(visible).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  const modeLabel = useMemo(() => {
    if (mode === 'replay') return '↻ replay';
    if (mode === 'paused') return '▶ paused';
    return '▮ playing';
  }, [mode]);
  const okValid = diverged == null;

  return (
    <div className="log-wrap relative">
      <div className="log-shadow pointer-events-none absolute inset-0 bg-fd-foreground" />
      <div className="log relative border-2 border-fd-foreground bg-fd-background">
        <div className="flex items-center justify-between gap-2 border-b-2 border-fd-foreground bg-fd-foreground/5 px-3 py-2 sm:px-4 sm:py-2.5">
          <span className="truncate font-mono text-[10px] font-bold tracking-wide text-fd-muted-foreground sm:text-[11px]">
            run · 01hz8…xkj3 · <span>{visible}</span> events
          </span>
          <span
            className={`shrink-0 border-2 border-fd-foreground px-1.5 py-0.5 font-mono text-[9px] font-black tracking-wide text-white sm:px-2 sm:text-[10px] ${
              okValid ? 'bg-emerald-500' : 'bg-rose-500'
            }`}
          >
            {okValid ? '✓ validated' : '✗ diverged'}
          </span>
        </div>

        <ol className="log-list font-mono text-[11px] sm:text-[12.5px]">
          {timeline.map((ev, i) => {
            const inView = i < visible;
            const isFlash = flashed.has(ev.seq);
            const isDiverged = diverged != null && ev.seq === diverged;
            return (
              <li
                key={ev.seq}
                className={[
                  'log-row grid grid-cols-[2.25rem_1fr] items-baseline gap-2 px-3 py-2 sm:grid-cols-[2.5rem_1fr] sm:gap-3 sm:px-4 sm:py-2.5',
                  'border-b border-fd-foreground/10 last:border-b-0',
                  inView ? 'in' : '',
                  isFlash ? 'flash' : '',
                  isDiverged ? 'diverged' : '',
                ].join(' ')}
              >
                <span className="seq font-bold text-fd-muted-foreground">
                  #{String(ev.seq).padStart(2, '0')}
                </span>
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:gap-x-3">
                  <span className={`kind break-all font-bold ${tagStyle[ev.tag]}`}>
                    {ev.kind}
                  </span>
                  <span className="note break-words text-fd-muted-foreground">
                    {ev.note}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 border-t-2 border-fd-foreground bg-fd-foreground/[0.03] px-3 py-2 text-[11px] sm:px-4">
          <button
            type="button"
            onClick={rewind}
            aria-label="rewind"
            title="rewind"
            className="flex h-6 w-7 items-center justify-center border-2 border-fd-foreground bg-fd-background text-fd-foreground shadow-[2px_2px_0_0_rgb(244_244_245)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_rgb(244_244_245)]"
          >
            ⏮
          </button>

          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative h-1.5 cursor-pointer touch-none border border-fd-foreground bg-fd-foreground/10"
          >
            <div
              className="absolute inset-y-0 left-0 bg-emerald-500"
              style={{ width: `${pct}%`, transition: 'width .15s linear' }}
            />
            <div
              className="absolute top-1/2 h-3.5 w-2.5 -translate-x-1/2 -translate-y-1/2 cursor-grab border-2 border-fd-foreground bg-fd-background active:cursor-grabbing"
              style={{ left: `${pct}%`, transition: 'left .15s linear' }}
            />
          </div>

          <span className="font-mono font-bold text-fd-muted-foreground">{counterText}</span>

          <button
            type="button"
            onClick={togglePlayPause}
            className={`border-2 border-fd-foreground px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wide ${
              mode === 'replay'
                ? 'bg-cyan-500 text-[#001b21]'
                : 'bg-fd-background text-fd-foreground'
            }`}
          >
            {modeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
