export function SectionTerm({
  path,
  title,
  accent = "text-accent2",
}: {
  path: string;
  title: string;
  accent?: string;
}) {
  return (
    <div className="mb-12">
      <p className="font-mono text-sm text-muted">
        <span className="text-accent2">kris</span>
        <span className="text-muted">@portfolio3d</span>
        <span className="text-accent">:/</span>
        <span className="text-accent2">{path}</span>
        <span className="text-accent">$</span>
        <span className="term-cursor ml-1 inline-block h-3.5 w-2 bg-accent" />
      </p>
      <h2 className={`mt-3 font-mono text-2xl font-bold md:text-4xl ${accent}`}>
        {title}
      </h2>
    </div>
  );
}