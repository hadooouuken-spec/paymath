export function HowItWorks({
  title = "How it works",
  steps,
}: {
  title?: string;
  steps: string[];
}) {
  return (
    <section className="mt-12" aria-labelledby="how-heading">
      <h2 id="how-heading" className="text-xl font-semibold text-ink">
        {title}
      </h2>
      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm leading-6 text-ink-muted">
            <span
              aria-hidden
              className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pine-light text-xs font-semibold text-pine-dark"
            >
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
