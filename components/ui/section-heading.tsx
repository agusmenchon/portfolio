export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mb-8 sm:mb-10">
      {eyebrow ? (
        <p className="mb-2 text-sm font-medium text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
