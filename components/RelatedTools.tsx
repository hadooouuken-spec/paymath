import Link from "next/link";
import { relatedTools } from "@/lib/site";

export function RelatedTools({ currentHref }: { currentHref: string }) {
  const tools = relatedTools(currentHref);
  return (
    <section className="mt-12" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-xl font-semibold text-ink">
        Related calculators
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="block h-full rounded-xl border border-line bg-white p-4 shadow-card transition hover:border-pine hover:shadow-none"
            >
              <p className="font-medium text-pine">{tool.label}</p>
              <p className="mt-1 text-sm leading-5 text-ink-muted">
                {tool.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
