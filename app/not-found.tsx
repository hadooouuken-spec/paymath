import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-3xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 text-ink-muted">
        That URL is not a PayMath calculator.
      </p>
      <p className="mt-6">
        <Link className="text-pine underline" href="/">
          Back to hourly to salary
        </Link>
      </p>
    </div>
  );
}
