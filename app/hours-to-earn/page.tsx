import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { HoursToEarnCalc } from "@/components/HoursToEarnCalc";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hours to Earn $X Calculator",
  description:
    "How many hours to earn a dollar amount? Enter an hourly rate or annual salary. Instant hours, workdays, and weeks.",
  alternates: { canonical: "/hours-to-earn" },
  openGraph: {
    title: "Hours to Earn $X | PayMath",
    description:
      "Find out how many hours of work it takes to earn a specific amount of money.",
    url: `${getSiteUrl()}/hours-to-earn`,
  },
};

const faq = [
  {
    question: "How many hours to earn $1,000?",
    answer:
      "Divide $1,000 by your hourly rate. At $25/hour it takes 40 hours, or one standard full-time week.",
  },
  {
    question: "Can I use salary instead of an hourly rate?",
    answer:
      "Yes. Enter annual salary and we convert it using hours per week and weeks per year, then divide the goal by that hourly rate.",
  },
  {
    question: "Are workdays always 8 hours?",
    answer:
      "The workday figure assumes 8-hour days so you can scan a familiar number. Weeks use the hours-per-week field you enter.",
  },
  {
    question: "Does this include overtime?",
    answer:
      "No. This page uses a straight hourly rate. If extra hours pay more, the overtime calculator is a better fit.",
  },
];

export default function HoursToEarnPage() {
  return (
    <CalculatorPage
      title="How many hours to earn $X"
      lede="Set a dollar goal and an hourly rate — or a salary — and see hours, 8-hour workdays, and weeks of work."
      currentHref="/hours-to-earn"
      howSteps={[
        "Enter the amount you want to earn.",
        "Add your hourly rate, or leave it blank and use annual salary instead.",
        "Hours needed = goal ÷ hourly rate.",
        "Weeks are hours divided by hours per week. Workdays assume 8 hours.",
      ]}
      faq={faq}
    >
      <HoursToEarnCalc />
    </CalculatorPage>
  );
}
