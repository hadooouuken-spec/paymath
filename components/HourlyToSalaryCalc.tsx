"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/NumberField";
import { ResultCard, ResultGrid } from "@/components/ResultCard";
import {
  applyTaxToBreakdown,
  breakdownFromHourly,
} from "@/lib/calc";
import { formatUsd, parseInputNumber } from "@/lib/format";
import { DEFAULTS } from "@/lib/site";

export function HourlyToSalaryCalc() {
  const [hourly, setHourly] = useState("25");
  const [hours, setHours] = useState(String(DEFAULTS.hoursPerWeek));
  const [weeks, setWeeks] = useState(String(DEFAULTS.weeksPerYear));
  const [tax, setTax] = useState("");

  const result = useMemo(() => {
    const hourlyRate = parseInputNumber(hourly) ?? 0;
    const hoursPerWeek = parseInputNumber(hours) ?? 0;
    const weeksPerYear = parseInputNumber(weeks) ?? 0;
    const taxPercent = parseInputNumber(tax) ?? 0;
    const gross = breakdownFromHourly(hourlyRate, hoursPerWeek, weeksPerYear);
    const net = applyTaxToBreakdown(gross, taxPercent);
    const showNet = taxPercent > 0;
    return { gross, net, showNet };
  }, [hourly, hours, weeks, tax]);

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
          hint="US dollars per hour"
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
          hint="Default 52. Use 50 if you take two unpaid weeks."
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
          label="Annual salary"
          value={formatUsd(result.gross.annual)}
          hint="Gross, before taxes"
        />
        <ResultGrid>
          <ResultCard label="Weekly" value={formatUsd(result.gross.weekly)} />
          <ResultCard label="Biweekly" value={formatUsd(result.gross.biweekly)} />
          <ResultCard label="Monthly" value={formatUsd(result.gross.monthly)} />
          <ResultCard
            label="Semi-monthly"
            value={formatUsd(result.gross.semimonthly)}
          />
        </ResultGrid>
        {result.showNet ? (
          <ResultCard
            label="After estimated withholding"
            value={formatUsd(result.net.annual)}
            hint="Annual, using your rough % — not tax advice"
          />
        ) : null}
      </div>
    </div>
  );
}
