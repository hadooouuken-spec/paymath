import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "PayMath privacy policy: calculators run in your browser. Ads, if enabled, are served by Google AdSense.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-muted">Last updated: August 24, 2026</p>
      <div className="mt-6 space-y-4 text-base leading-7 text-ink">
        <p>
          {SITE_NAME} is a free website of pay calculators. We built it to answer
          simple pay questions without collecting accounts or calculator inputs.
        </p>
        <h2 className="pt-2 text-xl font-semibold">What we collect</h2>
        <p>
          Calculator numbers are processed in your browser and are not sent to a
          PayMath server. We do not create user accounts, and we do not ask for
          your name, email, or paycheck details to use the tools.
        </p>
        <p>
          Our hosting provider (for example Vercel) may keep standard server logs
          such as IP address, browser type, and the pages requested. Those logs
          are used to operate and secure the site.
        </p>
        <h2 className="pt-2 text-xl font-semibold">Cookies and advertising</h2>
        <p>
          PayMath itself does not set an account cookie or a tracking wall. If
          Google AdSense is enabled on a live domain, Google may use cookies or
          similar technologies to serve and measure ads, including personalized
          or non-personalized ads according to your Google settings.
        </p>
        <p>
          Google&apos;s use of information is described in{" "}
          <a
            className="text-pine underline"
            href="https://policies.google.com/privacy"
            rel="noopener noreferrer"
          >
            Google&apos;s privacy policy
          </a>{" "}
          and{" "}
          <a
            className="text-pine underline"
            href="https://policies.google.com/technologies/ads"
            rel="noopener noreferrer"
          >
            how Google uses information from sites that use its services
          </a>
          . You can manage ad personalization in your Google account.
        </p>
        <h2 className="pt-2 text-xl font-semibold">Children</h2>
        <p>
          The site is a general-audience calculator. It is not directed at
          children under 13, and we do not knowingly collect personal information
          from children.
        </p>
        <h2 className="pt-2 text-xl font-semibold">Contact</h2>
        <p>
          Privacy questions:{" "}
          <a className="text-pine underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </article>
  );
}
