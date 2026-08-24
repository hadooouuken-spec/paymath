import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { HourlyToSalaryCalc } from "@/components/HourlyToSalaryCalc";
import { getSiteUrl, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Hourly to Salary Calculator | PayMath` },
  description: `${SITE_TAGLINE} Convert hourly wages to weekly, monthly, and annual salary. Free, instant, and private in your browser.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hourly to Salary Calculator | PayMath",
    description:
      "Turn an hourly wage into weekly, monthly, and annual salary. Instant, free, no account.",
    url: `${getSiteUrl()}/`,
  },
};

const faq = [
  {
    question: "How do you convert hourly pay to salary?",
    answer:
      "Multiply your hourly rate by hours per week, then by weeks per year. At 40 hours and 52 weeks, $25/hour is $52,000 a year.",
  },
  {
    question: "Is 40 hours and 52 weeks the right default?",
    answer:
      "Those are standard full-time defaults in the US. If you take unpaid time off, use fewer weeks. If you work part time, lower the hours.",
  },
  {
    question: "Does this include taxes?",
    answer:
      "Gross figures do not. You can add an optional withholding percent for a rough net estimate. It is not tax advice and does not replace a paycheck calculator from your employer.",
  },
  {
    question: "Do you store my numbers?",
    answer:
      "No. PayMath runs in your browser. There is no account and no server-side calculator.",
  },
];

export default function HomePage() {
  return (
    <CalculatorPage
      title="Hourly to salary calculator"
      lede="Type an hourly wage and see weekly, monthly, and annual pay instantly. Free, private, and built for a phone-sized screen."
      currentHref="/"
      howSteps={[
        "Enter your hourly rate in US dollars.",
        "Adjust hours per week and weeks per year if you are not on a standard 40 × 52 schedule.",
        "Optionally add a withholding percent for a rough after-tax estimate — not tax advice.",
        "Read the annual salary first, then weekly, biweekly, and monthly equivalents.",
      ]}
      faq={faq}
    >
      <HourlyToSalaryCalc />
    </CalculatorPage>
  );
}
