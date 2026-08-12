# Legacy redirect map

Published via root [`netlify.toml`](netlify.toml). Netlify serves the Next.js app from `web/` and applies these 301s at the edge.

| Old URL | New URL |
|---|---|
| `/index.html` | `/` |
| `/index-renew.html` | `/` |
| `/about.html` | `/about` |
| `/services.html` | `/services` |
| `/contact.html` | `/contact` |
| `/digital-stories.html` | `/work` |
| `/blog.html` | `/work` |
| `/blog-pages/*` | `/work` |
| `/services/seo.html` | `/services/seo` |
| `/services/ui-ux-development.html` | `/services/ui-ux-design` |
| `/services/web-application.html` | `/services/web-app-development` |
| `/services/mobile-development.html` | `/services/mobile-app-development` |
| `/services/ecommerce-development.html` | `/services/ecommerce-development` |
| `/services/logo-and-branding.html` | `/services/logo-branding` |
| `/services/graphic-design.html` | `/services/graphic-design` |
| `/services/copywriting.html` | `/services/copywriting` |
| `/services/social-media-management.html` | `/services/social-media-management` |
| `/services/online-advertising.html` | `/services/online-advertising` |
| `/services/photography-videography.html` | `/services/photography-videography` |

After cutover, keep root HTML for reference or move to `/legacy` (do not publish the root as the Netlify base).
