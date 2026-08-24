import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { BiweeklyPaycheckCalc } from "@/components/BiweeklyPaycheckCalc";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Biweekly Paycheck Calculator",
  description:
    "Free biweekly paycheck calculator. Convert hourly wage or annual salary into a biweekly paycheck, plus weekly, monthly, and annual pay. Optional tax estimate.",
  alternates: { canonical: "/biweekly-paycheck-calculator" },
  openGraph: {
    title: "Biweekly Paycheck Calculator | PayMath",
    description:
      "See what a biweekly paycheck looks like from hourly pay or annual salary. Instant math in your browser.",
    url: `${getSiteUrl()}/biweekly-paycheck-calculator`,
  },
};

const faq = [
  {
    question: "How do you calculate a biweekly paycheck?",
    answer:
      "Weekly pay is hourly rate × hours per week. A biweekly paycheck is two weeks of that amount. From salary, divide annual pay by weeks per year, then multiply by 2. At $20/hour and 40 hours, weekly is $800 and biweekly is $1,600.",
  },
  {
    question: "How many biweekly paychecks are there in a year?",
    answer:
      "Most employers issue 26 biweekly paychecks in a year (52 weeks ÷ 2). Semi-monthly pay is different: 24 pay periods, usually on set calendar dates.",
  },
  {
    question: "Is biweekly the same as semi-monthly?",
    answer:
      "No. Biweekly is every two weeks (26 checks). Semi-monthly is twice a month (24 checks), often on the 15th and last day. This page shows both monthly and the biweekly amount.",
  },
  {
    question: "Can I start from salary instead of hourly?",
    answer:
      "Yes. Leave hourly blank (or zero) and enter annual salary. We convert using hours per week and weeks per year, then show the biweekly gross.",
  },
];

export default function BiweeklyPaycheckPage() {
  return (
    <CalculatorPage
      title="Biweekly paycheck calculator"
      lede="Enter an hourly rate or annual salary and see a biweekly paycheck, plus weekly, monthly, and annual pay. Results update as you type."
      currentHref="/biweekly-paycheck-calculator"
      howSteps={[
        "Enter your hourly rate, or leave it blank and use annual salary instead.",
        "Confirm hours per week (40) and weeks per year (52) if your schedule is different.",
        "Biweekly gross is two weeks of pay: hourly × hours per week × 2.",
        "Optionally add a withholding percent for a rough net biweekly amount — not tax advice.",
      ]}
      faq={faq}
    >
      <BiweeklyPaycheckCalc />
    </CalculatorPage>
  );
}
