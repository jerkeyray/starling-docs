const LEAVES = ['e1', 'e2', 'e3', 'e4'];

export function MerkleViz() {
  return (
    <div className="merkle border-2 border-fd-foreground bg-fd-foreground/[0.04] p-4 shadow-[6px_6px_0_0_var(--color-emerald-500,#10b981)]">
      <div className="mb-3 font-mono text-[11px] font-extrabold uppercase tracking-[0.08em] text-fd-muted-foreground">
        merkle root
      </div>
      <div className="flex flex-col items-center gap-2">
        <Hash variant="root">root: 8af1…91e2</Hash>
        <span className="block h-4 w-[2px] bg-fd-foreground" />
        <div className="flex gap-2">
          <Hash>L: 04c3…9b1a</Hash>
          <Hash>R: 7d20…f4ee</Hash>
        </div>
        <div className="flex gap-4">
          {LEAVES.map((leaf) => (
            <Hash key={leaf}>{leaf}</Hash>
          ))}
        </div>
        <div className="mt-2 font-mono text-[11px] text-fd-muted-foreground">
          chain valid · 4/4 verified
        </div>
      </div>
    </div>
  );
}

function Hash({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: 'root';
}) {
  const base =
    'min-w-[70px] border-2 border-fd-foreground px-2.5 py-1 text-center font-mono text-[11px] font-bold';
  if (variant === 'root') {
    return (
      <div
        className={`${base} bg-emerald-500 text-[#001a11] shadow-[3px_3px_0_0_rgb(244_244_245)]`}
      >
        {children}
      </div>
    );
  }
  return (
    <div className={`${base} bg-fd-background text-fd-muted-foreground`}>
      {children}
    </div>
  );
}
