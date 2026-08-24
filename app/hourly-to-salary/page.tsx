import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { HourlyToSalaryCalc } from "@/components/HourlyToSalaryCalc";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Convert Hourly Wage to Annual Salary",
  description:
    "Convert hourly wage to annual, monthly, and weekly salary. Uses hours per week and weeks per year. Optional rough tax withholding estimate.",
  alternates: { canonical: "/hourly-to-salary" },
  openGraph: {
    title: "Convert Hourly Wage to Annual Salary | PayMath",
    description:
      "See what an hourly job pays per year. Instant math in your browser.",
    url: `${getSiteUrl()}/hourly-to-salary`,
  },
};

const faq = [
  {
    question: "What is the formula for hourly to yearly salary?",
    answer:
      "Annual salary = hourly rate × hours per week × weeks per year. Monthly is that annual number divided by 12.",
  },
  {
    question: "How many hours is a full-time year?",
    answer:
      "A common US figure is 2,080 hours: 40 hours × 52 weeks. This calculator lets you change both numbers.",
  },
  {
    question: "Should I use 52 weeks or fewer?",
    answer:
      "Use 52 if you are paid for the full year, including paid vacation. Use fewer weeks if time off is unpaid.",
  },
  {
    question: "Can I see take-home pay?",
    answer:
      "You can enter a withholding percent for a ballpark net number. Real take-home depends on filing status, benefits, and local taxes.",
  },
];

export default function HourlyToSalaryPage() {
  return (
    <CalculatorPage
      title="Convert hourly wage to salary"
      lede="A dedicated hourly-to-salary page with the same instant math as the homepage. Change hours and weeks to match your job."
      currentHref="/hourly-to-salary"
      howSteps={[
        "Start with dollars per hour.",
        "Set a realistic hours-per-week number (40 is full time for many US jobs).",
        "Set weeks per year (52 is the default).",
        "Scan annual salary, then monthly and weekly pay.",
      ]}
      faq={faq}
    >
      <HourlyToSalaryCalc />
    </CalculatorPage>
  );
}
