"use client";

import { useEffect } from "react";

const SIZES = {
  leaderboard: {
    className: "min-h-[90px] w-full max-w-[728px]",
    note: "Leaderboard · 728 × 90",
  },
  rectangle: {
    className: "min-h-[250px] w-full max-w-[300px]",
    note: "Rectangle · 300 × 250",
  },
  incontent: {
    className: "min-h-[100px] w-full max-w-[728px]",
    note: "In-content",
  },
} as const;

type Slot = keyof typeof SIZES;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  slot,
  className = "",
}: {
  slot: Slot;
  className?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  const size = SIZES[slot];

  useEffect(() => {
    if (!client) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // AdSense may be blocked by the browser; placeholders still render.
    }
  }, [client, slot]);

  if (client) {
    return (
      <div className={`mx-auto ${className}`.trim()} aria-label="Advertisement">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <aside
      className={`mx-auto flex ${size.className} items-center justify-center rounded-md border border-dashed border-line bg-white/70 ${className}`.trim()}
      aria-label="Advertisement placeholder"
    >
      <div className="px-3 py-2 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Advertisement
        </p>
        <p className="mt-1 text-xs text-ink-muted">{size.note}</p>
      </div>
    </aside>
  );
}
