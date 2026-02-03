# HomeHub Redesign Implementation Guide

## Overview

This guide provides step-by-step instructions for implementing the HomeHub premium dark-themed redesign using Oxygen Builder.

---

## File Structure

```
/assets/
├── css/
│   └── homehub-design-system.css    # Core design system styles
├── js/
│   └── homehub-scripts.js           # Custom JavaScript
├── php/
│   └── homehub-portfolio-cpt.php    # Portfolio custom post type
├── oxygen-templates/
│   └── components.html              # Component reference templates
└── docs/
    ├── implementation-guide.md      # This file
    ├── litespeed-cache-config.md    # Cache configuration
    └── plugin-consolidation-guide.md # Plugin removal guide
```

---

## Phase 1: Foundation Setup

### Step 1: Create Full Site Backup

1. Log into Hostinger hPanel
2. Navigate to **Files > Backups**
3. Create a new backup
4. Download a local copy for safety

### Step 2: Remove Redundant Plugins

Follow the order in `plugin-consolidation-guide.md`:

1. Deactivate and delete: Hostinger Easy Onboarding
2. Deactivate and delete: Hostinger AI Assistant
3. Deactivate and delete: AIOSEO REST API
4. Deactivate and delete: AIOSEO News Sitemap
5. Deactivate and delete: AIOSEO Video Sitemap
6. Deactivate and delete: MonsterInsights
7. Deactivate and delete: Microsoft Clarity (optional - keep if you want heatmaps)
8. Keep Better Search Replace but ensure it's deactivated

### Step 3: Configure LiteSpeed Cache

Follow the detailed settings in `litespeed-cache-config.md`.

**Critical Settings:**
- CSS Combine: OFF
- JS Combine: OFF
- CSS Minify: ON
- JS Minify: ON
- HTML Minify: ON
- Lazy Load Images: ON

### Step 4: Add Design System CSS

1. Go to **Oxygen > Settings > CSS**
2. Or use **WPCode > Add Snippet**
3. Copy the contents of `homehub-design-system.css`
4. Add as a new CSS snippet

**Alternative via Oxygen:**
1. Open Oxygen editor on any page
2. Go to **Manage > Stylesheets**
3. Create new stylesheet: "HomeHub Design System"
4. Paste the CSS content

### Step 5: Add Custom JavaScript

1. Go to **WPCode > Add Snippet**
2. Create new snippet: "HomeHub Scripts"
3. Type: JavaScript
4. Location: Site Wide Footer
5. Paste contents of `homehub-scripts.js`

### Step 6: Register Portfolio CPT

1. Go to **WPCode > Add Snippet**
2. Create new snippet: "HomeHub Portfolio CPT"
3. Type: PHP
4. Location: Run Everywhere
5. Paste contents of `homehub-portfolio-cpt.php`
6. Activate the snippet
7. Go to **Settings > Permalinks** and click "Save Changes" to flush rewrite rules

---

## Phase 2: Oxygen Global Styles

### Step 1: Set Global Colors

1. Open Oxygen on any page
2. Go to **Manage > Settings > Global Styles**
3. Click **Colors** tab
4. Add these colors:

| Name | Hex |
|------|-----|
| Obsidian | #0A0A0B |
| Charcoal | #141416 |
| Graphite | #1C1C1F |
| Slate | #27272A |
| Magenta | #D7229B |
| Gold | #C9A962 |
| Ice Blue | #00D4FF |
| White | #FFFFFF |
| Silver | #A1A1AA |
| Muted | #71717A |

### Step 2: Set Global Fonts

1. In Global Styles, click **Fonts** tab
2. Set:
   - Body Font: CaviarDreams
   - Heading Font: Aquatico

### Step 3: Set Typography Scale

In Global Styles > **Typography**:

**Body:**
- Font Family: CaviarDreams
- Font Size: 16px
- Line Height: 1.6
- Color: Silver (#A1A1AA)

**H1:**
- Font Family: Aquatico
- Font Size: 64px (use Oxygen's responsive sizes)
- Line Height: 1.1
- Color: White (#FFFFFF)

**H2-H6:** Scale down proportionally

### Step 4: Set Link Styles

- Color: Magenta (#D7229B)
- Hover Color: Gold (#C9A962)
- Text Decoration: None

---

## Phase 3: Build Reusable Components

### Create Header Template

1. Go to **Oxygen > Templates**
2. Add new template: "Header"
3. Set template type: "Reusable Part"
4. Build using the structure from `components.html`

**Structure:**
```
Section (header class)
└── Div Block (header-inner, container-default)
    ├── Link (logo)
    ├── Div Block (header-nav)
    │   ├── Link (nav items)
    │   └── Link Button (CTA)
    └── Div Block (mobile menu toggle)
```

**Important Settings:**
- Section: Position Fixed, Full Width, Z-index 1030
- Add glass-effect class for scrolled state

### Create Footer Template

1. Add new template: "Footer"
2. Set template type: "Reusable Part"
3. Build using the structure from `components.html`

**Structure:**
```
Section (footer class)
└── Div Block (footer-inner, container-default)
    ├── Div Block (footer-grid - 4 columns)
    │   ├── Div (brand column)
    │   ├── Div (links column)
    │   ├── Div (services column)
    │   └── Div (contact column)
    └── Div Block (footer-bottom)
```

### Create CTA Section Template

1. Add new template: "CTA Section"
2. Set template type: "Reusable Part"

**Structure:**
```
Section (cta-section class)
└── Div Block (cta-section-content)
    ├── Headline (cta-section-title)
    ├── Text Block (cta-section-description)
    └── Div Block (buttons row)
        ├── Link Button (primary)
        └── Link Button (outline)
```

---

## Phase 4: Create Page Templates

### Default Page Template

1. Go to **Oxygen > Templates**
2. Add new template: "Default Page"
3. Apply to: All Pages
4. Structure:
   - Header (reusable)
   - Inner Content
   - CTA Section (reusable)
   - Footer (reusable)

### Portfolio Archive Template

1. Add new template: "Portfolio Archive"
2. Apply to: Portfolio Archive
3. Structure:
   - Header (reusable)
   - Hero Section (page title)
   - Filter Buttons (optional)
   - Repeater (portfolio posts)
   - Load More Button
   - CTA Section (reusable)
   - Footer (reusable)

### Portfolio Single Template

1. Add new template: "Portfolio Single"
2. Apply to: Portfolio Single
3. Structure:
   - Header (reusable)
   - Hero (project image, title, category)
   - Project Details (meta fields)
   - Challenge Section
   - Solution Section
   - Gallery
   - Results Section
   - Testimonial
   - Next/Prev Navigation
   - CTA Section (reusable)
   - Footer (reusable)

---

## Phase 5: Build Pages

### Homepage Structure

1. Hero Section (100vh)
   - Background image/video
   - Overlay
   - Headline with gradient text
   - Subtitle
   - Dual CTAs: "View Our Work" + "Start a Project"

2. Social Proof Bar
   - Client/partner logos
   - Grayscale, 50% opacity

3. Services Overview
   - 3-column grid
   - Service cards with icons
   - Hover effects

4. Featured Work
   - 3 project cards
   - Use Oxygen Repeater
   - Query: Portfolio posts where featured = true
   - Limit: 3

5. Why Choose Us / Process
   - Numbered steps or icon list
   - Alternating layout

6. Testimonials
   - Slider or grid
   - Testimonial cards

7. CTA Section
   - Reusable CTA component

8. Footer
   - Reusable Footer component

### Contact Page Structure

1. Hero (smaller)
   - Page title
   - Brief intro text

2. Contact Section
   - Two columns:
     - Left: Contact form
     - Right: Contact info, map embed (optional)

3. Footer

### Services Page Structure

1. Hero
2. Service sections (alternating layout)
3. Process section
4. FAQ section (optional)
5. CTA Section
6. Footer

### About Page Structure

1. Hero
2. Story section
3. Values/Mission
4. Team section (optional)
5. Clients/Partners
6. CTA Section
7. Footer

---

## Phase 6: Forms & Lead Generation

### Contact Form Setup

Using Oxygen's Form element:

1. Add Form element
2. Configure fields:
   - Name (text, required)
   - Email (email, required)
   - Phone (tel, optional)
   - Project Type (select)
   - Budget Range (select)
   - Message (textarea, required)

3. Form Settings:
   - Email To: your@email.com
   - Subject: New Project Inquiry from [name]
   - Success Message: "Thank you! We'll be in touch soon."

4. Style with form classes from design system

### SMTP Configuration

1. Install WP Mail SMTP (if not already)
2. Configure with your email provider
3. Test form submission

---

## Phase 7: Performance Optimization

### Image Optimization

1. Compress all images before upload
2. Use WebP format where possible
3. Enable LiteSpeed's WebP conversion
4. Set proper image dimensions in Oxygen

### Font Preloading

Add to your header (via WPCode):

```html
<link rel="preload" href="/wp-content/uploads/fonts/Aquatico-Regular.otf" as="font" type="font/otf" crossorigin>
<link rel="preload" href="/wp-content/uploads/fonts/CaviarDreams.ttf" as="font" type="font/truetype" crossorigin>
```

### Critical CSS

For above-the-fold content, consider inlining critical CSS in the header.

---

## Phase 8: SEO Configuration

### AIOSEO Settings

1. **General Settings:**
   - Title Format: `%post_title% | HomeHub`
   - Meta Description: Set for each page

2. **Social Networks:**
   - Set default social images
   - Configure Open Graph

3. **Local Business:**
   - Add business info
   - Set schema markup

4. **Sitemaps:**
   - Enable XML sitemap
   - Include Portfolio CPT

### Schema Markup

Add organization schema via AIOSEO's Local Business addon.

---

## Phase 9: Testing Checklist

### Desktop Testing

- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Hover effects work
- [ ] Forms submit properly
- [ ] Images load (lazy loading)
- [ ] Animations trigger on scroll

### Tablet Testing (768px - 991px)

- [ ] Layout adjusts properly
- [ ] Grid columns collapse
- [ ] Mobile menu appears
- [ ] Touch interactions work

### Mobile Testing (< 767px)

- [ ] Single column layout
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Forms are usable
- [ ] No horizontal scroll

### Cross-Browser

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Performance

- [ ] PageSpeed Insights: 90+ desktop
- [ ] PageSpeed Insights: 80+ mobile
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s

---

## Phase 10: Launch Checklist

### Pre-Launch

- [ ] Final content review
- [ ] SEO titles and descriptions set
- [ ] Images optimized
- [ ] Forms tested
- [ ] 404 page created
- [ ] Redirects set (if needed)
- [ ] Analytics tracking verified
- [ ] Cookie consent configured

### Launch

- [ ] Clear all caches
- [ ] Test site in incognito
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify analytics tracking

### Post-Launch

- [ ] Monitor for 404 errors
- [ ] Check form submissions
- [ ] Monitor performance
- [ ] Watch for console errors
- [ ] Get user feedback

---

## Troubleshooting

### Oxygen Editor Not Loading

1. Disable LiteSpeed Cache temporarily
2. Clear all caches
3. Try incognito mode
4. Check for JavaScript errors

### Styles Not Applying

1. Ensure CSS is enqueued properly
2. Check for specificity conflicts
3. Clear LiteSpeed Cache
4. Check browser cache

### Forms Not Sending

1. Verify SMTP configuration
2. Check spam folder
3. Test with different email addresses
4. Check form action URL

### Slow Page Load

1. Review LiteSpeed settings
2. Optimize images
3. Defer non-critical JavaScript
4. Enable lazy loading

---

## Support Resources

- **Oxygen Documentation:** https://oxygenbuilder.com/documentation/
- **LiteSpeed Wiki:** https://docs.litespeedtech.com/lscache/
- **AIOSEO Documentation:** https://aioseo.com/docs/
- **WPCode Documentation:** https://wpcode.com/docs/
