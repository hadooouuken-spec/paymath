import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { OvertimeCalc } from "@/components/OvertimeCalc";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Overtime Pay Calculator",
  description:
    "Calculate weekly overtime pay. Hours over 40 are paid at 1.5× by default. Change the multiplier and threshold. Free and instant.",
  alternates: { canonical: "/overtime-calculator" },
  openGraph: {
    title: "Overtime Pay Calculator | PayMath",
    description:
      "Hours over 40 at time-and-a-half, with a configurable multiplier. Instant weekly overtime math.",
    url: `${getSiteUrl()}/overtime-calculator`,
  },
};

const faq = [
  {
    question: "How is overtime calculated here?",
    answer:
      "Regular hours are paid at your hourly rate up to the threshold (40 by default). Extra hours are paid at hourly rate × multiplier (1.5 by default).",
  },
  {
    question: "Is overtime always 1.5× after 40 hours in the US?",
    answer:
      "Many non-exempt hourly jobs follow the federal Fair Labor Standards Act 1.5× rule after 40 hours in a workweek. Some states, union contracts, or jobs use different rules. This tool lets you change both the threshold and the multiplier.",
  },
  {
    question: "Does this cover double time?",
    answer:
      "Set the multiplier to 2 if your extra hours are paid at double time. The calculator uses one multiplier for all overtime hours.",
  },
  {
    question: "Why is there an annual estimate?",
    answer:
      "It multiplies this week's gross by weeks per year. That is only useful if every week looks like this week.",
  },
];

export default function OvertimePage() {
  return (
    <CalculatorPage
      title="Overtime pay calculator"
      lede="See regular pay, overtime pay, and the weekly total. Hours over 40 use 1.5× unless you change the multiplier."
      currentHref="/overtime-calculator"
      howSteps={[
        "Enter your hourly rate and hours worked this week.",
        "Keep 40 and 1.5 unless your job uses a different overtime rule.",
        "Regular hours are paid at the base rate; extra hours use the multiplier.",
        "Optionally add a withholding percent or weeks per year for extra estimates.",
      ]}
      faq={faq}
    >
      <OvertimeCalc />
    </CalculatorPage>
  );
}
