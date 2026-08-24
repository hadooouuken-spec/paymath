import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "PayMath is a free, private set of pay calculators that run entirely in your browser.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">About {SITE_NAME}</h1>
      <p className="mt-4 text-base leading-7 text-ink-muted">{SITE_TAGLINE}</p>
      <div className="prose-pay mt-6 space-y-4 text-base leading-7 text-ink">
        <p>
          PayMath is a small set of pay calculators for common questions: what an
          hourly job pays per year, what a salary is worth per hour, how overtime
          adds up, and how long it takes to earn a dollar amount.
        </p>
        <p>
          Every tool runs in your browser. There are no accounts, no backend math
          servers, and no need to sign in. Numbers stay on your device.
        </p>
        <p>
          Results are estimates for education and planning. They are not tax,
          legal, or employment advice. Overtime rules and tax withholding vary
          by job, state, and filing status.
        </p>
        <p>
          Questions?{" "}
          <a className="text-pine underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </p>
        <p>
          <Link className="text-pine underline" href="/">
            Back to the calculators
          </Link>
        </p>
      </div>
    </article>
  );
}
