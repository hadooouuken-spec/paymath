"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/NumberField";
import { ResultCard, ResultGrid } from "@/components/ResultCard";
import { overtimePay } from "@/lib/calc";
import { formatNumber, formatUsd, parseInputNumber } from "@/lib/format";
import { DEFAULTS } from "@/lib/site";

const TIME_AND_A_HALF = 1.5;

export function TimeAndAHalfCalc() {
  const [hourly, setHourly] = useState("20");
  const [hoursWorked, setHoursWorked] = useState("45");
  const [threshold, setThreshold] = useState(String(DEFAULTS.overtimeThreshold));

  const result = useMemo(() => {
    const hourlyRate = parseInputNumber(hourly) ?? 0;
    const hours = parseInputNumber(hoursWorked) ?? 0;
    const cap = parseInputNumber(threshold) ?? DEFAULTS.overtimeThreshold;
    const ot = overtimePay({
      hourlyRate,
      hoursWorked: hours,
      threshold: cap,
      multiplier: TIME_AND_A_HALF,
    });
    return {
      ot,
      overtimeRate: hourlyRate * TIME_AND_A_HALF,
    };
  }, [hourly, hoursWorked, threshold]);

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
          hint="Straight-time dollars per hour"
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
      </form>

      <div className="space-y-3">
        <ResultCard
          featured
          label="Gross pay this week"
          value={formatUsd(result.ot.grossPay)}
          hint="Regular pay plus time-and-a-half overtime"
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
            label="Overtime rate (1.5×)"
            value={formatUsd(result.overtimeRate)}
            hint="Hourly rate × 1.5"
          />
          <ResultCard
            label="Overtime pay"
            value={formatUsd(result.ot.overtimePay)}
            hint="OT hours × time-and-a-half rate"
          />
        </ResultGrid>
      </div>
    </div>
  );
}
