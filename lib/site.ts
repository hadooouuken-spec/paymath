export const SITE_NAME = "PayMath";
export const SITE_TAGLINE = "Free pay calculators. Instant answers.";
export const CONTACT_EMAIL = "hello@paymath.app";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://paymath.vercel.app";
  return raw.replace(/\/$/, "");
}

export type Tool = {
  href: string;
  label: string;
  short: string;
  description: string;
};

export const TOOLS: Tool[] = [
  {
    href: "/",
    label: "Hourly to salary",
    short: "Hourly → salary",
    description: "Turn an hourly wage into weekly, monthly, and annual salary.",
  },
  {
    href: "/hourly-to-salary",
    label: "Hourly to salary",
    short: "Hourly → salary",
    description: "Turn an hourly wage into weekly, monthly, and annual salary.",
  },
  {
    href: "/salary-to-hourly",
    label: "Salary to hourly",
    short: "Salary → hourly",
    description: "Convert annual salary into an equivalent hourly rate.",
  },
  {
    href: "/overtime-calculator",
    label: "Overtime pay",
    short: "Overtime",
    description: "Pay for hours over 40 at 1.5×, with a configurable multiplier.",
  },
  {
    href: "/hours-to-earn",
    label: "Hours to earn $X",
    short: "Hours to earn",
    description: "See how many hours it takes to earn a dollar amount.",
  },
];

export const NAV_TOOLS: Tool[] = [
  TOOLS[0],
  TOOLS[2],
  TOOLS[3],
  TOOLS[4],
];

export function relatedTools(currentHref: string): Tool[] {
  const aliases = new Set<string>();
  if (currentHref === "/" || currentHref === "/hourly-to-salary") {
    aliases.add("/");
    aliases.add("/hourly-to-salary");
  } else {
    aliases.add(currentHref);
  }
  return NAV_TOOLS.filter((tool) => !aliases.has(tool.href));
}

export const DEFAULTS = {
  hoursPerWeek: 40,
  weeksPerYear: 52,
  overtimeThreshold: 40,
  overtimeMultiplier: 1.5,
  taxPercent: 0,
};
