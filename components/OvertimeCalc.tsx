"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/NumberField";
import { ResultCard, ResultGrid } from "@/components/ResultCard";
import { afterTax, overtimePay } from "@/lib/calc";
import { formatNumber, formatUsd, parseInputNumber } from "@/lib/format";
import { DEFAULTS } from "@/lib/site";

export function OvertimeCalc() {
  const [hourly, setHourly] = useState("20");
  const [hoursWorked, setHoursWorked] = useState("50");
  const [threshold, setThreshold] = useState(String(DEFAULTS.overtimeThreshold));
  const [multiplier, setMultiplier] = useState(String(DEFAULTS.overtimeMultiplier));
  const [weeks, setWeeks] = useState(String(DEFAULTS.weeksPerYear));
  const [tax, setTax] = useState("");

  const result = useMemo(() => {
    const hourlyRate = parseInputNumber(hourly) ?? 0;
    const hours = parseInputNumber(hoursWorked) ?? 0;
    const cap = parseInputNumber(threshold) ?? DEFAULTS.overtimeThreshold;
    const mult = parseInputNumber(multiplier) ?? DEFAULTS.overtimeMultiplier;
    const weeksPerYear = parseInputNumber(weeks) ?? 0;
    const taxPercent = parseInputNumber(tax) ?? 0;
    const ot = overtimePay({
      hourlyRate,
      hoursWorked: hours,
      threshold: cap,
      multiplier: mult,
    });
    const annual = ot.grossPay * weeksPerYear;
    return {
      ot,
      annual,
      netWeek: afterTax(ot.grossPay, taxPercent),
      netAnnual: afterTax(annual, taxPercent),
      showNet: taxPercent > 0,
    };
  }, [hourly, hoursWorked, threshold, multiplier, weeks, tax]);

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
        />
        <NumberField
          id="hours-worked"
          label="Hours worked this week"
          value={hoursWorked}
          onChange={setHoursWorked}
        />
        <NumberField
          id="threshold"
          label="Overtime after (hours)"
          value={threshold}
          onChange={setThreshold}
          hint="US default is 40 hours in a workweek for many hourly jobs."
        />
        <NumberField
          id="multiplier"
          label="Overtime multiplier"
          suffix="×"
          value={multiplier}
          onChange={setMultiplier}
          hint="Default 1.5 (time-and-a-half)."
        />
        <NumberField
          id="weeks"
          label="Weeks per year"
          value={weeks}
          onChange={setWeeks}
          hint="Used only for the annual estimate if every week looks like this."
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
          label="Gross pay this week"
          value={formatUsd(result.ot.grossPay)}
        />
        <ResultGrid>
          <ResultCard
            label="Regular hours"
            value={formatNumber(result.ot.regularHours)}
            hint={formatUsd(result.ot.regularPay)}
          />
          <ResultCard
            label="Overtime hours"
            value={formatNumber(result.ot.overtimeHours)}
            hint={formatUsd(result.ot.overtimePay)}
          />
          <ResultCard
            label="Blended hourly"
            value={formatUsd(result.ot.blendedHourly)}
          />
          <ResultCard
            label="If this week repeats"
            value={formatUsd(result.annual)}
            hint="Estimated annual gross"
          />
        </ResultGrid>
        {result.showNet ? (
          <ResultCard
            label="After estimated withholding"
            value={formatUsd(result.netWeek)}
            hint={`${formatUsd(result.netAnnual)} per year — not tax advice`}
          />
        ) : null}
      </div>
    </div>
  );
}
