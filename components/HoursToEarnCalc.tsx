"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/NumberField";
import { ResultCard, ResultGrid } from "@/components/ResultCard";
import { hourlyFromSalaryOrRate, hoursToEarn } from "@/lib/calc";
import {
  formatHours,
  formatNumber,
  formatUsd,
  formatWeeks,
  parseInputNumber,
} from "@/lib/format";
import { DEFAULTS } from "@/lib/site";

export function HoursToEarnCalc() {
  const [target, setTarget] = useState("1000");
  const [hourly, setHourly] = useState("25");
  const [salary, setSalary] = useState("");
  const [hours, setHours] = useState(String(DEFAULTS.hoursPerWeek));
  const [weeks, setWeeks] = useState(String(DEFAULTS.weeksPerYear));

  const result = useMemo(() => {
    const goal = parseInputNumber(target) ?? 0;
    const hoursPerWeek = parseInputNumber(hours) ?? 0;
    const weeksPerYear = parseInputNumber(weeks) ?? 0;
    const hourlyRate = hourlyFromSalaryOrRate({
      hourlyRate: parseInputNumber(hourly),
      annualSalary: parseInputNumber(salary),
      hoursPerWeek,
      weeksPerYear,
    });
    const needed = hoursToEarn(goal, hourlyRate, hoursPerWeek, 8);
    return { hourlyRate, needed, goal };
  }, [target, hourly, salary, hours, weeks]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <NumberField
          id="target"
          label="Amount you want to earn"
          prefix="$"
          value={target}
          onChange={setTarget}
        />
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
          label="Or annual salary (optional)"
          prefix="$"
          value={salary}
          onChange={setSalary}
          hint="We convert this to hourly using hours and weeks below."
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
          hint="Only used when converting salary to hourly."
        />
      </form>

      <div className="space-y-3">
        {result.needed.reachable ? (
          <>
            <ResultCard
              featured
              label="Hours to earn it"
              value={formatHours(result.needed.hours)}
              hint={`At ${formatUsd(result.hourlyRate)} per hour`}
            />
            <ResultGrid>
              <ResultCard
                label="Workdays (8 hours)"
                value={formatNumber(result.needed.workdays)}
              />
              <ResultCard
                label="Weeks of work"
                value={formatWeeks(result.needed.weeks)}
              />
              <ResultCard
                label="Goal"
                value={formatUsd(result.goal)}
              />
              <ResultCard
                label="Hourly rate used"
                value={formatUsd(result.hourlyRate)}
              />
            </ResultGrid>
          </>
        ) : (
          <ResultCard
            featured
            label="Hours to earn it"
            value="—"
            hint="Enter an hourly rate (or a salary) greater than zero."
          />
        )}
      </div>
    </div>
  );
}
