const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const usdWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

const numberPrecise = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatUsd(value: number, opts?: { whole?: boolean }): string {
  if (!Number.isFinite(value)) return "—";
  return (opts?.whole ? usdWhole : usd).format(value);
}

export function formatNumber(value: number, precise = false): string {
  if (!Number.isFinite(value)) return "—";
  return (precise ? numberPrecise : number).format(value);
}

export function formatHours(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 100) / 100;
  const label = rounded === 1 ? "hour" : "hours";
  return `${formatNumber(rounded)} ${label}`;
}

export function formatWeeks(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 100) / 100;
  const label = rounded === 1 ? "week" : "weeks";
  return `${formatNumber(rounded)} ${label}`;
}

export function parseInputNumber(raw: string): number | null {
  const trimmed = raw.trim().replace(/[$,%\s]/g, "").replace(/,/g, "");
  if (trimmed === "" || trimmed === "." || trimmed === "-") return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n)) return null;
  return n;
}
