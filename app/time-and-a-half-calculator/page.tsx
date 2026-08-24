import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { TimeAndAHalfCalc } from "@/components/TimeAndAHalfCalc";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Time and a Half Calculator",
  description:
    "Free time and a half calculator. Hours over 40 pay at 1.5× your hourly rate. See regular hours, overtime hours, OT rate, OT pay, and weekly gross.",
  alternates: { canonical: "/time-and-a-half-calculator" },
  openGraph: {
    title: "Time and a Half Calculator | PayMath",
    description:
      "Calculate overtime at time and a half (1.5×). Instant regular vs OT hours, OT rate, and weekly gross.",
    url: `${getSiteUrl()}/time-and-a-half-calculator`,
  },
};

const faq = [
  {
    question: "What is time and a half?",
    answer:
      "Time and a half means overtime hours are paid at 1.5 times your regular hourly rate. At $20/hour the overtime rate is $30/hour. Five overtime hours add $150 to a 40-hour week, for $950 gross.",
  },
  {
    question: "How do you calculate time-and-a-half overtime?",
    answer:
      "Regular hours (up to 40 by default) × hourly rate, plus overtime hours × hourly rate × 1.5. The overtime rate shown is hourly × 1.5.",
  },
  {
    question: "Is overtime always after 40 hours in the US?",
    answer:
      "Many non-exempt hourly jobs follow the federal Fair Labor Standards Act: 1.5× after 40 hours in a workweek. Some states, union contracts, or jobs use a different threshold. You can change that number here.",
  },
  {
    question: "How is this different from the overtime calculator?",
    answer:
      "This page is locked to a 1.5× multiplier — the usual “time and a half” rule. The overtime calculator lets you change the multiplier, including double time.",
  },
];

export default function TimeAndAHalfPage() {
  return (
    <CalculatorPage
      title="Time and a half calculator"
      lede="See regular hours, overtime hours, the 1.5× overtime rate, overtime pay, and weekly gross. Hours over 40 are time and a half unless you change the threshold."
      currentHref="/time-and-a-half-calculator"
      howSteps={[
        "Enter your hourly rate and hours worked this week.",
        "Keep 40 unless your job starts overtime at a different hour count.",
        "Regular hours are paid at the base rate. Extra hours use time and a half (hourly × 1.5).",
        "Gross is regular pay plus overtime pay.",
      ]}
      faq={faq}
    >
      <TimeAndAHalfCalc />
    </CalculatorPage>
  );
}
