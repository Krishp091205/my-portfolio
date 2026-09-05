export function SectionTerm({
  path,
  title,
  index,
  className = "",
}: {
  path: string;
  title: string;
  index: string;
  className?: string;
}) {
  return (
    <div className="mb-14 flex items-end justify-between gap-6 border-b border-foreground/5 pb-5">
      <div>
        <p className="font-mono text-xs tracking-wide text-muted">
          <span className="text-foreground/70">kris@portfolio3d</span>
          <span className="text-muted">:</span>
          <span className="text-foreground/40">{path}</span>
          <span className="text-accent glow-lime">$</span>
        </p>
        <h2
          className={`title-display mt-3 font-display text-3xl font-medium text-foreground md:text-5xl ${className}`}
        >
          {title}
        </h2>
      </div>
      <span
        aria-hidden
        className="hidden font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/25 md:block"
      >
        {index}
      </span>
    </div>
  );
}