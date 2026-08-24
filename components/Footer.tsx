import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold text-ink">{SITE_NAME}</p>
          <p className="mt-1 max-w-sm text-sm text-ink-muted">{SITE_TAGLINE}</p>
          <p className="mt-3 max-w-md text-xs leading-5 text-ink-muted">
            Estimates only. PayMath is not tax, legal, or employment advice.
            Actual take-home pay depends on taxes, benefits, overtime rules, and
            your employer.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li>
              <Link className="text-ink-muted hover:text-pine" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-ink-muted hover:text-pine" href="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <a
                className="text-ink-muted hover:text-pine"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
