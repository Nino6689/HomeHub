# HomeHub Smart Solutions Website

## Project Overview
Static HTML website for HomeHub Smart Solutions - a smart home installation company based in Horsham, West Sussex, UK. Services include CCTV, home cinema, smart home automation, networking, and elderly care monitoring (Guardian).

**Live site:** https://hhssuk.co.uk
**GitHub:** https://github.com/Nino6689/HomeHub (public)

## Deployment

### Auto-Deploy Workflow
```bash
git add .
git commit -m "Description"
git push
# Hostinger auto-deploys via webhook - no manual action needed
```

### Manual Deploy (if needed)
Hostinger → Hosting → Advanced → GIT → Deploy

## Project Structure
```
HomeHub/
├── index.html              # Homepage
├── cctv.html               # CCTV service page
├── home-cinema.html        # Audio visual service page
├── smart-integrations.html # Smart home service page
├── guardian.html           # Elderly care monitoring
├── networking.html         # WiFi/network service page
├── web-branding.html       # Web design service page
├── contact.html            # Contact form
├── reviews.html            # Customer reviews
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── cookies.html            # Cookie policy
├── cctv-installation-crawley.html    # Local SEO page
├── cctv-installation-brighton.html   # Local SEO page
├── smart-home-installation-horsham.html  # Local SEO page
├── blog/                   # Blog articles (23 posts)
│   ├── index.html          # Blog listing
│   └── *.html              # Individual articles
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js             # Site functionality
│   └── cookies.js          # Cookie consent + GA4 consent mode
├── images/                 # Site images
├── fonts/                  # Custom fonts
├── sitemap.xml             # XML sitemap (38 URLs)
├── robots.txt              # Search engine directives
└── .gitignore
```

## Technical Stack
- **Frontend:** Static HTML, CSS, vanilla JavaScript
- **Hosting:** Hostinger (LiteSpeed server)
- **CDN:** Cloudflare
- **Analytics:** Google Analytics 4 (G-8NKBPS4EK0)
- **Fonts:** Space Grotesk, Inter (Google Fonts)

## SEO Implementation

### Google Consent Mode v2
All pages implement GDPR-compliant consent mode:
- Default consent set to `denied` before GA loads
- Cookie banner updates consent on user action
- Located in `<head>` of every HTML file

### Structured Data (JSON-LD)
- **LocalBusiness** schema on homepage
- **Service** schema on service pages
- **FAQPage** schema on service pages
- **Article** schema on blog posts
- **BreadcrumbList** schema on all pages

### Local SEO
- Location landing pages for key towns (Crawley, Brighton, Horsham)
- Geo meta tags (`geo.region`, `geo.placename`)
- Service area definitions in schema
- NAP consistency (Name, Address, Phone)

### Sitemap
- 38 URLs total
- Submitted to Google Search Console and Bing Webmaster Tools
- Auto-discovered via robots.txt

## Key Files to Know

### cookies.js
Handles cookie consent banner and Google Consent Mode v2 updates:
- Shows banner if no consent
- Updates `gtag('consent', 'update', ...)` on accept
- Stores preference in `hhss_cookie_consent` cookie

### styles.css
CSS custom properties (variables) define the design system:
- `--primary`: #7C3AED (purple)
- `--gray-*`: Gray scale
- Responsive breakpoints at 768px, 1024px

## Common Tasks

### Add a new blog post
1. Create `blog/new-post-slug.html` (copy existing post as template)
2. Update `blog/index.html` to include the new post
3. Add entry to `sitemap.xml`
4. Commit and push

### Add a new location page
1. Create `service-location.html` (e.g., `cctv-installation-worthing.html`)
2. Include LocalBusiness schema with areaServed
3. Add FAQPage schema with location-specific questions
4. Add to `sitemap.xml`
5. Commit and push

### Update Google Analytics
- Measurement ID: G-8NKBPS4EK0
- Consent mode code is in `<head>` of every HTML file
- Consent update logic is in `js/cookies.js`

## Contact
- **Phone:** 01403 626006
- **Email:** info@homehubsmartsolutions.com
- **Address:** Cook Way, Horsham, West Sussex, RH12 3US
