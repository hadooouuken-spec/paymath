import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} at ${CONTACT_EMAIL}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Contact</h1>
      <p className="mt-4 text-base leading-7 text-ink-muted">
        Email{" "}
        <a className="font-medium text-pine underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        . This is a placeholder inbox for the PayMath project.
      </p>
    </article>
  );
}
