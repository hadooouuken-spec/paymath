import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const paths = [
    "/",
    "/hourly-to-salary",
    "/salary-to-hourly",
    "/overtime-calculator",
    "/hours-to-earn",
    "/biweekly-paycheck-calculator",
    "/salary-to-monthly",
    "/time-and-a-half-calculator",
    "/about",
    "/privacy",
    "/contact",
  ];

  return paths.map((path) => ({
    url: `${base}${path === "/" ? "/" : path}`,
    lastModified: new Date("2026-08-24"),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/about") || path.startsWith("/privacy") || path.startsWith("/contact") ? 0.4 : 0.8,
  }));
}
