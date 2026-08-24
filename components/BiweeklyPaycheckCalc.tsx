"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/NumberField";
import { ResultCard, ResultGrid } from "@/components/ResultCard";
import {
  applyTaxToBreakdown,
  breakdownFromAnnual,
  breakdownFromHourly,
} from "@/lib/calc";
import { formatUsd, parseInputNumber } from "@/lib/format";
import { DEFAULTS } from "@/lib/site";

export function BiweeklyPaycheckCalc() {
  const [hourly, setHourly] = useState("20");
  const [salary, setSalary] = useState("");
  const [hours, setHours] = useState(String(DEFAULTS.hoursPerWeek));
  const [weeks, setWeeks] = useState(String(DEFAULTS.weeksPerYear));
  const [tax, setTax] = useState("");

  const result = useMemo(() => {
    const hourlyRate = parseInputNumber(hourly);
    const annualSalary = parseInputNumber(salary);
    const hoursPerWeek = parseInputNumber(hours) ?? 0;
    const weeksPerYear = parseInputNumber(weeks) ?? 0;
    const taxPercent = parseInputNumber(tax) ?? 0;
    const useHourly = hourlyRate != null && hourlyRate > 0;
    const gross = useHourly
      ? breakdownFromHourly(hourlyRate, hoursPerWeek, weeksPerYear)
      : breakdownFromAnnual(annualSalary ?? 0, hoursPerWeek, weeksPerYear);
    const net = applyTaxToBreakdown(gross, taxPercent);
    return { gross, net, showNet: taxPercent > 0 };
  }, [hourly, salary, hours, weeks, tax]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <NumberField
          id="hourly"
          label="Hourly rate"
          prefix="$"
          value={hourly}
          onChange={setHourly}
          hint="Used first if you enter both rate and salary."
        />
        <NumberField
          id="salary"
          label="Or annual salary"
          prefix="$"
          value={salary}
          onChange={setSalary}
          hint="Used when hourly rate is empty. Converted with hours and weeks below."
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
          hint="Default 52. A biweekly paycheck is two weeks of pay."
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
          label="Biweekly paycheck"
          value={formatUsd(result.gross.biweekly)}
          hint="Gross, before taxes"
        />
        <ResultGrid>
          <ResultCard label="Weekly" value={formatUsd(result.gross.weekly)} />
          <ResultCard label="Monthly" value={formatUsd(result.gross.monthly)} />
          <ResultCard label="Annual" value={formatUsd(result.gross.annual)} />
          <ResultCard
            label="Hourly equivalent"
            value={formatUsd(result.gross.hourly)}
          />
        </ResultGrid>
        {result.showNet ? (
          <ResultCard
            label="After estimated withholding"
            value={formatUsd(result.net.biweekly)}
            hint={`${formatUsd(result.net.annual)} per year — not tax advice`}
          />
        ) : null}
      </div>
    </div>
  );
}
