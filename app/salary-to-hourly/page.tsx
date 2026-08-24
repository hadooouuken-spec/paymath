import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SalaryToHourlyCalc } from "@/components/SalaryToHourlyCalc";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Salary to Hourly Calculator",
  description:
    "Convert annual salary to an hourly rate, plus weekly, biweekly, and monthly pay. Free instant calculator.",
  alternates: { canonical: "/salary-to-hourly" },
  openGraph: {
    title: "Salary to Hourly Calculator | PayMath",
    description:
      "Turn a yearly salary into an equivalent hourly wage. Instant, free, no account.",
    url: `${getSiteUrl()}/salary-to-hourly`,
  },
};

const faq = [
  {
    question: "How do you convert salary to hourly?",
    answer:
      "Divide annual salary by hours per year. Hours per year is hours per week times weeks per year. $52,000 ÷ 2,080 = $25/hour.",
  },
  {
    question: "Does salaried pay always divide evenly by 2,080?",
    answer:
      "Only if you work 40 hours a week for 52 weeks. Salaried roles often expect more or fewer hours. Adjust the inputs to match reality.",
  },
  {
    question: "What is a biweekly paycheck from salary?",
    answer:
      "A common estimate is annual salary divided by 26. This tool also shows weekly and monthly amounts.",
  },
  {
    question: "Is overtime included?",
    answer:
      "No. This page assumes straight salary. Use the overtime calculator if you are paid hourly with extra hours.",
  },
];

export default function SalaryToHourlyPage() {
  return (
    <CalculatorPage
      title="Salary to hourly calculator"
      lede="Paste a yearly salary and see the equivalent hourly rate, plus weekly and monthly pay. Results update as you type."
      currentHref="/salary-to-hourly"
      howSteps={[
        "Enter gross annual salary in US dollars.",
        "Confirm hours per week and weeks per year.",
        "Read the equivalent hourly rate first.",
        "Use the optional withholding field only as a rough estimate, not tax advice.",
      ]}
      faq={faq}
    >
      <SalaryToHourlyCalc />
    </CalculatorPage>
  );
}
