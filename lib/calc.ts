export function clampNonNegative(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}

export function clampPercent(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  if (value > 100) return 100;
  return value;
}

export function hoursPerYear(hoursPerWeek: number, weeksPerYear: number): number {
  return clampNonNegative(hoursPerWeek) * clampNonNegative(weeksPerYear);
}

export function hourlyToAnnual(
  hourlyRate: number,
  hoursPerWeek: number,
  weeksPerYear: number,
): number {
  return clampNonNegative(hourlyRate) * hoursPerYear(hoursPerWeek, weeksPerYear);
}

export function annualToHourly(
  annualSalary: number,
  hoursPerWeek: number,
  weeksPerYear: number,
): number {
  const hours = hoursPerYear(hoursPerWeek, weeksPerYear);
  if (hours === 0) return 0;
  return clampNonNegative(annualSalary) / hours;
}

export type PayBreakdown = {
  hourly: number;
  weekly: number;
  biweekly: number;
  semimonthly: number;
  monthly: number;
  annual: number;
};

export function breakdownFromHourly(
  hourlyRate: number,
  hoursPerWeek: number,
  weeksPerYear: number,
): PayBreakdown {
  const hourly = clampNonNegative(hourlyRate);
  const weekly = hourly * clampNonNegative(hoursPerWeek);
  const annual = weekly * clampNonNegative(weeksPerYear);
  return {
    hourly,
    weekly,
    biweekly: weekly * 2,
    semimonthly: annual / 24,
    monthly: annual / 12,
    annual,
  };
}

export function breakdownFromAnnual(
  annualSalary: number,
  hoursPerWeek: number,
  weeksPerYear: number,
): PayBreakdown {
  const annual = clampNonNegative(annualSalary);
  const weeks = clampNonNegative(weeksPerYear);
  const weekly = weeks === 0 ? 0 : annual / weeks;
  const hourly = annualToHourly(annual, hoursPerWeek, weeksPerYear);
  return {
    hourly,
    weekly,
    biweekly: weekly * 2,
    semimonthly: annual / 24,
    monthly: annual / 12,
    annual,
  };
}

export function afterTax(gross: number, taxPercent: number): number {
  const rate = clampPercent(taxPercent) / 100;
  return clampNonNegative(gross) * (1 - rate);
}

export function applyTaxToBreakdown(
  breakdown: PayBreakdown,
  taxPercent: number,
): PayBreakdown {
  return {
    hourly: afterTax(breakdown.hourly, taxPercent),
    weekly: afterTax(breakdown.weekly, taxPercent),
    biweekly: afterTax(breakdown.biweekly, taxPercent),
    semimonthly: afterTax(breakdown.semimonthly, taxPercent),
    monthly: afterTax(breakdown.monthly, taxPercent),
    annual: afterTax(breakdown.annual, taxPercent),
  };
}

export type OvertimeInput = {
  hourlyRate: number;
  hoursWorked: number;
  threshold?: number;
  multiplier?: number;
};

export type OvertimeResult = {
  regularHours: number;
  overtimeHours: number;
  regularPay: number;
  overtimePay: number;
  grossPay: number;
  blendedHourly: number;
};

export function overtimePay({
  hourlyRate,
  hoursWorked,
  threshold = 40,
  multiplier = 1.5,
}: OvertimeInput): OvertimeResult {
  const rate = clampNonNegative(hourlyRate);
  const hours = clampNonNegative(hoursWorked);
  const cap = clampNonNegative(threshold);
  const mult = clampNonNegative(multiplier);

  const regularHours = Math.min(hours, cap);
  const overtimeHours = Math.max(0, hours - cap);
  const regularPay = regularHours * rate;
  const overtimePayAmount = overtimeHours * rate * mult;
  const grossPay = regularPay + overtimePayAmount;
  const blendedHourly = hours === 0 ? 0 : grossPay / hours;

  return {
    regularHours,
    overtimeHours,
    regularPay,
    overtimePay: overtimePayAmount,
    grossPay,
    blendedHourly,
  };
}

export type HoursToEarnResult = {
  hours: number;
  weeks: number;
  workdays: number;
  reachable: boolean;
};

export function hoursToEarn(
  targetAmount: number,
  hourlyRate: number,
  hoursPerWeek = 40,
  workdayHours = 8,
): HoursToEarnResult {
  const target = clampNonNegative(targetAmount);
  const rate = clampNonNegative(hourlyRate);
  const weekHours = clampNonNegative(hoursPerWeek);
  const dayHours = clampNonNegative(workdayHours);

  if (rate === 0) {
    return { hours: 0, weeks: 0, workdays: 0, reachable: target === 0 };
  }

  const hours = target / rate;
  return {
    hours,
    weeks: weekHours === 0 ? 0 : hours / weekHours,
    workdays: dayHours === 0 ? 0 : hours / dayHours,
    reachable: true,
  };
}

export function hourlyFromSalaryOrRate(opts: {
  hourlyRate: number | null;
  annualSalary: number | null;
  hoursPerWeek: number;
  weeksPerYear: number;
}): number {
  if (opts.hourlyRate != null && opts.hourlyRate > 0) {
    return opts.hourlyRate;
  }
  if (opts.annualSalary != null && opts.annualSalary > 0) {
    return annualToHourly(opts.annualSalary, opts.hoursPerWeek, opts.weeksPerYear);
  }
  return 0;
}
