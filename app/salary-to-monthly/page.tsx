import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SalaryToMonthlyCalc } from "@/components/SalaryToMonthlyCalc";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Annual Salary to Monthly Calculator",
  description:
    "Convert annual salary to monthly pay. Instant monthly, semi-monthly, biweekly, and weekly amounts from a yearly salary. Free calculator.",
  alternates: { canonical: "/salary-to-monthly" },
  openGraph: {
    title: "Annual Salary to Monthly Calculator | PayMath",
    description:
      "Turn a yearly salary into monthly, semi-monthly, biweekly, and weekly pay. Instant, free, no account.",
    url: `${getSiteUrl()}/salary-to-monthly`,
  },
};

const faq = [
  {
    question: "How do you convert annual salary to monthly?",
    answer:
      "Divide annual salary by 12. $60,000 a year is $5,000 per month before taxes. That is a calendar-month figure, not a paycheck size.",
  },
  {
    question: "What is the difference between monthly and semi-monthly?",
    answer:
      "Monthly is annual ÷ 12. Semi-monthly is annual ÷ 24 — two checks each month, often on the 15th and last day. Biweekly is annual ÷ 26 because there are 26 two-week periods in a year.",
  },
  {
    question: "Why is a biweekly check not the same as half of monthly?",
    answer:
      "A biweekly year has 26 pay periods; a monthly year has 12. Half of $5,000 is $2,500, but $60,000 ÷ 26 is about $2,307.69. Two extra paychecks land in some months.",
  },
  {
    question: "Does this include taxes?",
    answer:
      "Gross figures do not. You can add an optional withholding percent for a rough net monthly number. It is not tax advice.",
  },
];

export default function SalaryToMonthlyPage() {
  return (
    <CalculatorPage
      title="Annual salary to monthly"
      lede="Paste a yearly salary and see monthly pay, plus semi-monthly, biweekly, and weekly amounts. Built for the “annual salary to monthly” search."
      currentHref="/salary-to-monthly"
      howSteps={[
        "Enter gross annual salary in US dollars.",
        "Monthly pay is annual salary divided by 12.",
        "Semi-monthly is annual ÷ 24. Biweekly is two weeks of pay (annual ÷ 52 × 2).",
        "Optionally add a withholding percent for a rough after-tax monthly estimate — not tax advice.",
      ]}
      faq={faq}
    >
      <SalaryToMonthlyCalc />
    </CalculatorPage>
  );
}
