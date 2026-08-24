"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/NumberField";
import { ResultCard, ResultGrid } from "@/components/ResultCard";
import {
  applyTaxToBreakdown,
  breakdownFromAnnual,
} from "@/lib/calc";
import { formatUsd, parseInputNumber } from "@/lib/format";
import { DEFAULTS } from "@/lib/site";

export function SalaryToMonthlyCalc() {
  const [salary, setSalary] = useState("60000");
  const [tax, setTax] = useState("");

  const result = useMemo(() => {
    const annualSalary = parseInputNumber(salary) ?? 0;
    const taxPercent = parseInputNumber(tax) ?? 0;
    const gross = breakdownFromAnnual(
      annualSalary,
      DEFAULTS.hoursPerWeek,
      DEFAULTS.weeksPerYear,
    );
    const net = applyTaxToBreakdown(gross, taxPercent);
    return { gross, net, showNet: taxPercent > 0 };
  }, [salary, tax]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <NumberField
          id="salary"
          label="Annual salary"
          prefix="$"
          value={salary}
          onChange={setSalary}
          hint="Gross yearly pay in US dollars"
        />
        <NumberField
          id="tax"
          label="Tax withholding (optional)"
          suffix="%"
          value={tax}
          onChange={setTax}
          hint="Rough estimate, not tax advice."
        />
      </form>

      <div className="space-y-3">
        <ResultCard
          featured
          label="Monthly pay"
          value={formatUsd(result.gross.monthly)}
          hint="Annual salary ÷ 12"
        />
        <ResultGrid>
          <ResultCard
            label="Semi-monthly"
            value={formatUsd(result.gross.semimonthly)}
            hint="24 pay periods a year"
          />
          <ResultCard
            label="Biweekly"
            value={formatUsd(result.gross.biweekly)}
            hint="26 pay periods a year"
          />
          <ResultCard label="Weekly" value={formatUsd(result.gross.weekly)} />
          <ResultCard
            label="Hourly equivalent"
            value={formatUsd(result.gross.hourly)}
            hint="At 40 hours × 52 weeks"
          />
        </ResultGrid>
        {result.showNet ? (
          <ResultCard
            label="After estimated withholding"
            value={formatUsd(result.net.monthly)}
            hint="Monthly, using your rough % — not tax advice"
          />
        ) : null}
      </div>
    </div>
  );
}
