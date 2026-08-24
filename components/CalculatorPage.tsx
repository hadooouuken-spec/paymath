import type { ReactNode } from "react";
import { AdSlot } from "@/components/AdSlot";
import { Faq, type FaqItem } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { RelatedTools } from "@/components/RelatedTools";

export function CalculatorPage({
  title,
  lede,
  currentHref,
  children,
  howSteps,
  faq,
}: {
  title: string;
  lede: string;
  currentHref: string;
  children: ReactNode;
  howSteps: string[];
  faq: FaqItem[];
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-ink-muted">{lede}</p>
      <AdSlot slot="leaderboard" className="mt-6" />

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          {children}
          <div className="mt-6 lg:hidden">
            <AdSlot slot="rectangle" />
          </div>
          <HowItWorks steps={howSteps} />
          <AdSlot slot="incontent" className="mt-10" />
          <Faq items={faq} />
          <RelatedTools currentHref={currentHref} />
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-6">
            <AdSlot slot="rectangle" />
          </div>
        </aside>
      </div>
    </div>
  );
}
