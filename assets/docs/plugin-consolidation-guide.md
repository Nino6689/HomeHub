# HomeHub Plugin Consolidation Guide

## Overview
This guide outlines the plugin consolidation strategy to improve admin performance and page load times.

**Expected Impact:**
- 20-30% faster admin dashboard
- 15-25% reduction in page load time
- Reduced security attack surface
- Simplified maintenance

---

## Plugins to Remove (8 Total)

### 1. MonsterInsights (Google Analytics for WordPress)

**Reason:** Redundant - Google Site Kit provides the same analytics functionality.

**Steps to Remove:**
1. Go to **Plugins > Installed Plugins**
2. Find "Google Analytics for WordPress by MonsterInsights"
3. Click **Deactivate**
4. After deactivation, click **Delete**
5. Verify Site Kit is still tracking properly in **Site Kit > Dashboard**

**Data Migration:** None required - Site Kit uses the same Google Analytics property.

---

### 2. Microsoft Clarity

**Reason:** Keep one analytics/heatmap tool only. Site Kit + Google Analytics is sufficient for a portfolio site.

**Steps to Remove:**
1. Go to **Plugins > Installed Plugins**
2. Find "Microsoft Clarity"
3. Click **Deactivate**
4. Click **Delete**

**Note:** If you want heatmaps specifically, consider keeping Clarity instead of MonsterInsights. Choose one:
- **Site Kit + Clarity** = Analytics + Heatmaps (lean option)
- **Site Kit only** = Analytics only (leanest option)

---

### 3. AIOSEO - News Sitemap

**Reason:** News sitemaps are for news publishers. Not needed for a portfolio/agency site.

**Steps to Remove:**
1. Go to **Plugins > Installed Plugins**
2. Find "AIOSEO - News Sitemap"
3. Click **Deactivate**
4. Click **Delete**

---

### 4. AIOSEO - Video Sitemap

**Reason:** Only necessary for sites with substantial video content. Can be reinstalled if you add video content later.

**Steps to Remove:**
1. Go to **Plugins > Installed Plugins**
2. Find "AIOSEO - Video Sitemap"
3. Click **Deactivate**
4. Click **Delete**

---

### 5. AIOSEO - REST API

**Reason:** Developer/debugging tool. Not needed for production sites.

**Steps to Remove:**
1. Go to **Plugins > Installed Plugins**
2. Find "AIOSEO - REST API"
3. Click **Deactivate**
4. Click **Delete**

---

### 6. Hostinger Easy Onboarding

**Reason:** One-time setup wizard. No longer needed after initial setup.

**Steps to Remove:**
1. Go to **Plugins > Installed Plugins**
2. Find "Hostinger Easy Onboarding"
3. Click **Deactivate**
4. Click **Delete**

**Note:** This won't affect your hosting or Hostinger account.

---

### 7. Hostinger AI Assistant

**Reason:** Adds overhead, rarely used for day-to-day operations.

**Steps to Remove:**
1. Go to **Plugins > Installed Plugins**
2. Find "Hostinger AI Assistant"
3. Click **Deactivate**
4. Click **Delete**

**Note:** You can always reinstall from Hostinger hPanel if needed.

---

### 8. Better Search Replace

**Reason:** This is a maintenance tool, not needed to be active constantly.

**Action:** Keep installed but **DEACTIVATED**

**Steps:**
1. Go to **Plugins > Installed Plugins**
2. Find "Better Search Replace"
3. Ensure it shows as **Deactivated**
4. Only activate when you need to do search/replace operations
5. Deactivate again after use

---

## Plugins to Keep (15 Total)

### Core Builder
| Plugin | Purpose | Notes |
|--------|---------|-------|
| Oxygen Builder | Page builder | Core of the site |
| Oxygen Gutenberg Integration | Block editor support | Keep for content editing |

### SEO Suite (AIOSEO Pro)
| Plugin | Purpose | Notes |
|--------|---------|-------|
| All in One SEO Pack | Core SEO | Main SEO functionality |
| AIOSEO - E-E-A-T | Author expertise signals | Good for agency credibility |
| AIOSEO - Image SEO | Image optimization | Auto alt text, file names |
| AIOSEO - Index Now | Fast indexing | Quick search engine updates |
| AIOSEO - Local Business | Local SEO | Good if targeting local clients |
| AIOSEO - Link Assistant | Internal linking | Helps with SEO structure |

### Performance & Security
| Plugin | Purpose | Notes |
|--------|---------|-------|
| LiteSpeed Cache | Caching/performance | Primary optimization tool |
| WPConsent | Cookie consent | GDPR compliance |

### Analytics & Monitoring
| Plugin | Purpose | Notes |
|--------|---------|-------|
| Google Site Kit | Analytics/Search Console | Single analytics solution |

### Utilities
| Plugin | Purpose | Notes |
|--------|---------|-------|
| WPCode | Code snippets | For custom functionality |
| Hostinger Tools | Hosting integration | Keep for hosting features |

### Lead Generation (Evaluate)
| Plugin | Purpose | Decision |
|--------|---------|----------|
| OptinMonster | Popups/lead capture | **EVALUATE** - Remove if not using popups |

---

## OptinMonster Decision Tree

**Keep OptinMonster if:**
- You're actively using exit-intent popups
- You have lead magnet opt-in forms
- You're running email list building campaigns

**Remove OptinMonster if:**
- You only use a simple contact form
- You're not collecting emails for marketing
- The site is purely portfolio/showcase

**Alternative:** Use Oxygen's built-in form element for contact forms (no plugin needed).

---

## Removal Order (Recommended)

Follow this order to minimize issues:

1. **First:** Hostinger Easy Onboarding (safe, one-time tool)
2. **Second:** Hostinger AI Assistant (safe, utility tool)
3. **Third:** AIOSEO REST API (safe, developer tool)
4. **Fourth:** AIOSEO News Sitemap (safe, not in use)
5. **Fifth:** AIOSEO Video Sitemap (safe, not in use)
6. **Sixth:** Microsoft Clarity OR MonsterInsights (choose one)
7. **Last:** The other analytics tool

---

## Pre-Removal Checklist

Before removing any plugin:

- [ ] Create a full site backup (Hostinger hPanel or plugin)
- [ ] Document current analytics tracking codes (if needed)
- [ ] Note any shortcodes from plugins being removed
- [ ] Test the site to establish baseline performance
- [ ] Take a PageSpeed Insights screenshot for comparison

---

## Post-Removal Checklist

After removing plugins:

- [ ] Clear all caches (LiteSpeed Cache > Toolbox > Purge All)
- [ ] Test all pages load correctly
- [ ] Verify contact form still works
- [ ] Check that analytics is still tracking (Site Kit > Dashboard)
- [ ] Run PageSpeed Insights and compare to baseline
- [ ] Check for any console errors in browser dev tools
- [ ] Test on mobile device

---

## Troubleshooting

### Site Broken After Removal

1. Re-activate the plugin via FTP or hosting file manager
2. Navigate to `/wp-content/plugins/`
3. Rename the plugin folder (add `-disabled` suffix)
4. Access site and diagnose

### Missing Functionality

Check if the removed plugin provided:
- Custom shortcodes (will show as raw text)
- Custom post types (posts may become inaccessible)
- JavaScript functionality (check console for errors)

### Performance Not Improved

1. Clear all caches
2. Wait 24 hours for CDN propagation
3. Run multiple PageSpeed tests
4. Check if remaining plugins have conflicting features

---

## Plugin Count Summary

| Before | After |
|--------|-------|
| 23+ active | 15 active |
| Multiple analytics | Single analytics (Site Kit) |
| Multiple sitemaps | Core sitemap only |
| Setup wizards active | Setup tools removed |

**Net Reduction:** ~8 plugins (35% reduction)
