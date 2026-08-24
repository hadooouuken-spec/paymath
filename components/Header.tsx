import Link from "next/link";
import { NAV_TOOLS, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-line bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-pine focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to calculator
      </a>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-lg bg-pine text-lg font-bold text-white"
          >
            $
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-tight text-ink group-hover:text-pine">
              {SITE_NAME}
            </span>
            <span className="block text-sm text-ink-muted">{SITE_TAGLINE}</span>
          </span>
        </Link>
        <nav aria-label="Calculators">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
            {NAV_TOOLS.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="text-ink-muted underline-offset-4 hover:text-pine hover:underline"
                >
                  {tool.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
