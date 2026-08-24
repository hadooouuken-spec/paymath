# PayMath

Free pay calculators. Instant answers.

PayMath is a mobile-first website of AdSense-safe pay calculators. All math runs in the browser. There are no accounts and no backend.

**Tools**

- [Hourly to salary](/) and [/hourly-to-salary](/hourly-to-salary)
- [Salary to hourly](/salary-to-hourly)
- [Overtime pay](/overtime-calculator) (hours over 40 at 1.5x, multiplier configurable)
- [Hours to earn $X](/hours-to-earn)

## Run locally

Requires Node.js 18+.

```bash
cd paymath
npm install
npm test
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build
npm start
```

## Add an AdSense client ID

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Set:

```
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

If `NEXT_PUBLIC_ADSENSE_CLIENT` is empty, the site shows labeled **Advertisement** placeholders (leaderboard, rectangle, in-content). No fake `ads.txt` is included.

**AdSense still needs a live domain.** A publisher ID on localhost is not enough. Google reviews a publicly reachable site. Deploy first, add the site in AdSense, then set the client ID in Vercel environment variables and redeploy.

## Deploy on Vercel Hobby (free)

This repo is set up for a free GitHub repository and a Vercel Hobby deploy (`*.vercel.app`).

1. Push this folder to a GitHub repo (public or private).
2. In [Vercel](https://vercel.com), import that repo. Hobby is enough.
3. Set `NEXT_PUBLIC_SITE_URL` to your `https://….vercel.app` URL (or a custom domain later).
4. Leave `NEXT_PUBLIC_ADSENSE_CLIENT` empty until AdSense approves the live site.

`vercel.json` pins the Next.js framework. You do not need paid Origin, Pro, or extra Vercel seats for this static-friendly app.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- Vitest unit tests for `lib/calc.ts`
- No database

Estimates only — not tax, legal, or employment advice.
