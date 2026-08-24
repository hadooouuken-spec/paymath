import { describe, expect, it } from "vitest";
import {
  afterTax,
  annualToHourly,
  applyTaxToBreakdown,
  breakdownFromAnnual,
  breakdownFromHourly,
  clampNonNegative,
  clampPercent,
  hourlyFromSalaryOrRate,
  hourlyToAnnual,
  hoursPerYear,
  hoursToEarn,
  overtimePay,
} from "./calc";

describe("hourlyToAnnual / annualToHourly", () => {
  it("converts $25/hr at 40h × 52w to $52,000", () => {
    expect(hourlyToAnnual(25, 40, 52)).toBe(52_000);
  });

  it("converts $52,000 at 40h × 52w back to $25/hr", () => {
    expect(annualToHourly(52_000, 40, 52)).toBe(25);
  });

  it("round-trips common full-time hours (2,080)", () => {
    const annual = hourlyToAnnual(37.5, 40, 52);
    expect(annual).toBe(78_000);
    expect(annualToHourly(annual, 40, 52)).toBe(37.5);
  });

  it("returns 0 hourly when hours per year is 0", () => {
    expect(annualToHourly(52_000, 0, 52)).toBe(0);
    expect(annualToHourly(52_000, 40, 0)).toBe(0);
  });

  it("treats negative inputs as 0", () => {
    expect(hourlyToAnnual(-20, 40, 52)).toBe(0);
    expect(hourlyToAnnual(20, -40, 52)).toBe(0);
  });
});

describe("hoursPerYear", () => {
  it("uses 40 × 52 = 2,080", () => {
    expect(hoursPerYear(40, 52)).toBe(2080);
  });
});

describe("breakdownFromHourly", () => {
  it("splits $20/hr into weekly, monthly, and annual", () => {
    const b = breakdownFromHourly(20, 40, 52);
    expect(b.hourly).toBe(20);
    expect(b.weekly).toBe(800);
    expect(b.biweekly).toBe(1600);
    expect(b.annual).toBe(41_600);
    expect(b.monthly).toBeCloseTo(41_600 / 12, 10);
    expect(b.semimonthly).toBeCloseTo(41_600 / 24, 10);
  });
});

describe("breakdownFromAnnual", () => {
  it("derives hourly and weekly from $62,400", () => {
    const b = breakdownFromAnnual(62_400, 40, 52);
    expect(b.annual).toBe(62_400);
    expect(b.hourly).toBe(30);
    expect(b.weekly).toBe(1200);
  });
});

describe("overtimePay", () => {
  it("pays 50 hours at $20 and 1.5× as $1,100", () => {
    const r = overtimePay({
      hourlyRate: 20,
      hoursWorked: 50,
      threshold: 40,
      multiplier: 1.5,
    });
    expect(r.regularHours).toBe(40);
    expect(r.overtimeHours).toBe(10);
    expect(r.regularPay).toBe(800);
    expect(r.overtimePay).toBe(300);
    expect(r.grossPay).toBe(1100);
    expect(r.blendedHourly).toBe(22);
  });

  it("treats a 40-hour week as all regular time", () => {
    const r = overtimePay({ hourlyRate: 18, hoursWorked: 40 });
    expect(r.overtimeHours).toBe(0);
    expect(r.overtimePay).toBe(0);
    expect(r.grossPay).toBe(720);
  });

  it("supports a custom double-time multiplier", () => {
    const r = overtimePay({
      hourlyRate: 15,
      hoursWorked: 44,
      threshold: 40,
      multiplier: 2,
    });
    expect(r.regularPay).toBe(600);
    expect(r.overtimePay).toBe(120);
    expect(r.grossPay).toBe(720);
  });

  it("uses a configurable threshold other than 40", () => {
    const r = overtimePay({
      hourlyRate: 10,
      hoursWorked: 45,
      threshold: 35,
      multiplier: 1.5,
    });
    expect(r.regularHours).toBe(35);
    expect(r.overtimeHours).toBe(10);
    expect(r.grossPay).toBe(35 * 10 + 10 * 15);
  });
});

describe("hoursToEarn", () => {
  it("needs 40 hours to earn $1,000 at $25/hr", () => {
    const r = hoursToEarn(1000, 25, 40, 8);
    expect(r.reachable).toBe(true);
    expect(r.hours).toBe(40);
    expect(r.weeks).toBe(1);
    expect(r.workdays).toBe(5);
  });

  it("marks an unpaid rate as unreachable unless the target is 0", () => {
    const none = hoursToEarn(500, 0);
    expect(none.reachable).toBe(false);
    expect(none.hours).toBe(0);

    const zero = hoursToEarn(0, 0);
    expect(zero.reachable).toBe(true);
    expect(zero.hours).toBe(0);
  });
});

describe("afterTax", () => {
  it("applies a 10% withholding estimate", () => {
    expect(afterTax(1000, 10)).toBe(900);
  });

  it("clamps percent to 0–100", () => {
    expect(afterTax(1000, -5)).toBe(1000);
    expect(afterTax(1000, 150)).toBe(0);
  });

  it("maps a full breakdown", () => {
    const gross = breakdownFromHourly(25, 40, 52);
    const net = applyTaxToBreakdown(gross, 20);
    expect(net.annual).toBe(gross.annual * 0.8);
    expect(net.weekly).toBe(gross.weekly * 0.8);
  });
});

describe("helpers", () => {
  it("clamps non-negative and percent values", () => {
    expect(clampNonNegative(-3)).toBe(0);
    expect(clampNonNegative(Number.NaN)).toBe(0);
    expect(clampPercent(120)).toBe(100);
  });

  it("prefers an explicit hourly rate over salary", () => {
    expect(
      hourlyFromSalaryOrRate({
        hourlyRate: 22,
        annualSalary: 100_000,
        hoursPerWeek: 40,
        weeksPerYear: 52,
      }),
    ).toBe(22);
  });

  it("falls back to salary when hourly is missing", () => {
    expect(
      hourlyFromSalaryOrRate({
        hourlyRate: null,
        annualSalary: 52_000,
        hoursPerWeek: 40,
        weeksPerYear: 52,
      }),
    ).toBe(25);
  });
});
