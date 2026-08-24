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

export function SalaryToHourlyCalc() {
  const [salary, setSalary] = useState("60000");
  const [hours, setHours] = useState(String(DEFAULTS.hoursPerWeek));
  const [weeks, setWeeks] = useState(String(DEFAULTS.weeksPerYear));
  const [tax, setTax] = useState("");

  const result = useMemo(() => {
    const annualSalary = parseInputNumber(salary) ?? 0;
    const hoursPerWeek = parseInputNumber(hours) ?? 0;
    const weeksPerYear = parseInputNumber(weeks) ?? 0;
    const taxPercent = parseInputNumber(tax) ?? 0;
    const gross = breakdownFromAnnual(annualSalary, hoursPerWeek, weeksPerYear);
    const net = applyTaxToBreakdown(gross, taxPercent);
    return { gross, net, showNet: taxPercent > 0 };
  }, [salary, hours, weeks, tax]);

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
          id="hours"
          label="Hours per week"
          value={hours}
          onChange={setHours}
          hint="Default 40"
        />
        <NumberField
          id="weeks"
          label="Weeks per year"
          value={weeks}
          onChange={setWeeks}
          hint="Default 52"
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
          label="Hourly rate"
          value={formatUsd(result.gross.hourly)}
          hint="Gross equivalent"
        />
        <ResultGrid>
          <ResultCard label="Weekly" value={formatUsd(result.gross.weekly)} />
          <ResultCard label="Biweekly" value={formatUsd(result.gross.biweekly)} />
          <ResultCard label="Monthly" value={formatUsd(result.gross.monthly)} />
          <ResultCard
            label="Hours per year"
            value={`${(
              (parseInputNumber(hours) ?? 0) * (parseInputNumber(weeks) ?? 0)
            ).toLocaleString("en-US")}`}
          />
        </ResultGrid>
        {result.showNet ? (
          <ResultCard
            label="After estimated withholding"
            value={formatUsd(result.net.hourly)}
            hint="Hourly, using your rough % — not tax advice"
          />
        ) : null}
      </div>
    </div>
  );
}
