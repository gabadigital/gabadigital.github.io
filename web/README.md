# Gabadigital web

Next.js App Router + Tailwind + MDX marketing site for [gabadigital.com](https://www.gabadigital.com).

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS v4
- MDX case studies & service pages (`content/`)
- Netlify (GitHub continuous deploy, `base = web`)

## Develop

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

| Path | Purpose |
|---|---|
| `content/work/*.mdx` | Case studies |
| `content/services/*.mdx` | Service pages |
| `public/llms.txt` | GEO / AI citation facts |
| `lib/site.ts` | Nav, phones, social, org facts |

## Deploy (Netlify)

Root [`../netlify.toml`](../netlify.toml) sets:

- `base = "web"`
- `command = npm run build`
- Node 20
- Legacy HTML → App Router 301 redirects

Push to GitHub; Netlify builds `/web` only. Legacy static HTML at the repo root is not published once the Netlify base directory is `web`.

### Cutover checklist

1. Confirm Netlify base directory is `web` (from `netlify.toml`).
2. Deploy production and verify `/en`, `/fr`, `/en/work`, `/en/services`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`.

## Locales

- English: `/en…`
- French: `/fr…`
- Root `/` redirects to `/en`
- UI chrome, home, about, contact, services nav are fully translated. Case-study MDX bodies remain English until FR content is supplied.
- Studio photography in `public/studio/` is from [Unsplash](https://unsplash.com/) (agency / collaboration scenes).
3. Spot-check legacy redirects (`/about.html` → `/about`, service `.html` paths).
4. Submit sitemap in Google Search Console.
5. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in Netlify env (optional).
6. Watch Core Web Vitals in Search Console / CrUX.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
