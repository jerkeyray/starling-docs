'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  style?: CSSProperties;
};

export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      el.classList.add('in');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('in');
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);

    return () => {
      io.disconnect();
    };
  }, []);

  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
