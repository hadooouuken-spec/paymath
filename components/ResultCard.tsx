import type { ReactNode } from "react";

export function ResultCard({
  label,
  value,
  hint,
  featured = false,
}: {
  label: string;
  value: string;
  hint?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? "rounded-xl bg-pine px-4 py-4 text-white sm:px-5"
          : "rounded-xl bg-pine-light px-4 py-4 sm:px-5"
      }
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.12em] ${
          featured ? "text-white/80" : "text-pine-dark"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-1 font-semibold tabular-nums tracking-tight ${
          featured ? "text-3xl sm:text-4xl" : "text-2xl text-ink sm:text-3xl"
        }`}
      >
        {value}
      </p>
      {hint ? (
        <p className={`mt-1 text-sm ${featured ? "text-white/80" : "text-ink-muted"}`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function ResultGrid({ children }: { children: ReactNode }) {
  return (
    <div
      className="grid gap-3 sm:grid-cols-2"
      aria-live="polite"
      aria-atomic="true"
    >
      {children}
    </div>
  );
}
