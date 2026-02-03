# LiteSpeed Cache Configuration Guide

## Overview
This document outlines the recommended LiteSpeed Cache settings for HomeHub to achieve optimal performance while maintaining Oxygen Builder compatibility.

---

## WordPress Admin Settings

Navigate to: **LiteSpeed Cache > General**

### General Settings
| Setting | Value | Notes |
|---------|-------|-------|
| Enable LiteSpeed Cache | ON | |
| Guest Mode | OFF | Not needed for portfolio site |
| Guest Optimization | OFF | |
| Server IP | (leave blank) | |
| Notifications | OFF | Reduces admin overhead |

---

## Cache Settings

Navigate to: **LiteSpeed Cache > Cache**

### Cache Tab
| Setting | Value | Notes |
|---------|-------|-------|
| Enable Cache | ON | |
| Cache Logged-in Users | OFF | Portfolio doesn't need logged-in caching |
| Cache Commenters | OFF | |
| Cache REST API | ON | |
| Cache Login Page | OFF | |
| Cache favicon.ico | ON | |
| Cache PHP Resources | ON | |
| Cache Mobile | OFF | Oxygen handles responsive design |

### TTL Tab
| Setting | Value | Notes |
|---------|-------|-------|
| Default Public Cache TTL | 604800 | 1 week |
| Default Private Cache TTL | 1800 | 30 minutes |
| Default Front Page TTL | 604800 | 1 week |
| Default Feed TTL | 604800 | 1 week |
| Default REST TTL | 604800 | 1 week |
| Default HTTP Status 404 TTL | 3600 | 1 hour |
| Default HTTP Status 403 TTL | 3600 | 1 hour |
| Default HTTP Status 500 TTL | 0 | Don't cache errors |

### Purge Tab
| Setting | Value | Notes |
|---------|-------|-------|
| Purge All On Upgrade | ON | |
| Auto Purge Rules For Publish/Update | All selected | |
| Serve Stale | ON | Improves perceived performance |
| Scheduled Purge URLs | (leave blank) | |
| Scheduled Purge Time | (leave blank) | |

### Excludes Tab
| Setting | Value |
|---------|-------|
| Do Not Cache URIs | `/wp-admin/*`<br>`/wp-login.php`<br>`/xmlrpc.php`<br>`/wp-cron.php` |
| Do Not Cache Query Strings | `fbclid`<br>`gclid`<br>`utm_*`<br>`_ga` |
| Do Not Cache Categories | (leave blank) |
| Do Not Cache Tags | (leave blank) |
| Do Not Cache Cookie | (leave blank) |
| Do Not Cache User Agents | (leave blank) |
| Do Not Cache Roles | Administrator |

---

## Page Optimization

Navigate to: **LiteSpeed Cache > Page Optimization**

### CSS Settings Tab
| Setting | Value | Notes |
|---------|-------|-------|
| CSS Minify | ON | |
| CSS Combine | **OFF** | CRITICAL: Oxygen compatibility |
| Generate UCSS | OFF | Can conflict with Oxygen |
| UCSS Inline | OFF | |
| CSS Combine External and Inline | **OFF** | CRITICAL: Oxygen compatibility |
| Load CSS Asynchronously | OFF | Can cause FOUC with Oxygen |
| CCSS Per URL | OFF | |
| Inline CSS Async Lib | OFF | |
| Font Display Optimization | Swap | Matches our font settings |

### JS Settings Tab
| Setting | Value | Notes |
|---------|-------|-------|
| JS Minify | ON | |
| JS Combine | **OFF** | CRITICAL: Oxygen compatibility |
| JS Combine External and Inline | **OFF** | |
| Load JS Deferred | ON | Improves initial load |
| Load Inline JS | Default | |
| Exclude JQuery | ON | Prevents jQuery issues |

### HTML Settings Tab
| Setting | Value | Notes |
|---------|-------|-------|
| HTML Minify | ON | |
| DNS Prefetch | ON | |
| DNS Prefetch Control | ON | |
| Remove Query Strings | ON | Improves caching |
| Load Google Fonts Asynchronously | OFF | We self-host fonts |
| Remove Google Fonts | OFF | We don't use Google Fonts |
| Remove WordPress Emoji | ON | Performance improvement |
| Remove Noscript Tags | OFF | Keep for accessibility |

### Media Settings Tab
| Setting | Value | Notes |
|---------|-------|-------|
| Lazy Load Images | ON | |
| Basic Image Placeholder | (leave default) | |
| Responsive Placeholder | ON | |
| Responsive Placeholder SVG | (leave default) | |
| Responsive Placeholder Color | #0A0A0B | Match obsidian background |
| LQIP Cloud Generator | OFF | |
| Lazy Load Iframes | ON | |
| Add Missing Sizes | ON | |

### Media Excludes Tab
| Setting | Value |
|---------|-------|
| Lazy Load Image Excludes | `logo`<br>`above-fold`<br>`hero` |
| Lazy Load Image Class Name Excludes | `no-lazy`<br>`skip-lazy` |
| Lazy Load Iframe Class Name Excludes | (leave blank) |
| Preload Featured Image | ON |

### Localization Tab
| Setting | Value | Notes |
|---------|-------|-------|
| Gravatar Cache | ON | If using gravatars |
| Gravatar Cache Cron | ON | |
| Gravatar Cache TTL | 604800 | 1 week |
| Localize Resources | OFF | May conflict with CDN |

---

## Image Optimization

Navigate to: **LiteSpeed Cache > Image Optimization**

### Image Optimization Summary Tab
| Setting | Value | Notes |
|---------|-------|-------|
| Auto Request Cron | ON | |
| Auto Pull Cron | ON | |
| Optimization Cron | ON | |
| Ori Images Optimization | Lossless | |
| Remove Original Backups | OFF | Keep originals safe |
| Optimize WebP Versions | ON | |
| Image WebP Replacement | ON | |
| Preserve EXIF/XMP data | OFF | Reduces file size |

---

## Object Cache

Navigate to: **LiteSpeed Cache > Cache > Object**

| Setting | Value | Notes |
|---------|-------|-------|
| Object Cache | ON | If Redis/Memcached available |
| Method | Redis (preferred) | Check with Hostinger |
| Host | 127.0.0.1 | |
| Port | 6379 | Default Redis port |
| Default Object Lifetime | 360 | 6 minutes |
| Admin Bar | ON | Shows cache status |
| Store Transients | ON | |

---

## Browser Cache

Navigate to: **LiteSpeed Cache > Cache > Browser**

| Setting | Value | Notes |
|---------|-------|-------|
| Browser Cache | ON | |
| Browser Cache TTL | 31536000 | 1 year for static assets |

---

## CDN Settings (If Using)

Navigate to: **LiteSpeed Cache > CDN**

If using Cloudflare or other CDN:
| Setting | Value |
|---------|-------|
| QUIC.cloud CDN | OFF (if using external CDN) |
| Use CDN Mapping | ON |
| CDN URL | (your CDN URL) |
| Include Images | ON |
| Include CSS | ON |
| Include JS | ON |

---

## Crawler Settings

Navigate to: **LiteSpeed Cache > Crawler**

| Setting | Value | Notes |
|---------|-------|-------|
| Crawler | ON | Keeps cache warm |
| Delay | 500 | Milliseconds between requests |
| Run Duration | 400 | Seconds |
| Interval Between Runs | 600 | 10 minutes |
| Crawl Interval | 302400 | 3.5 days |
| Threads | 3 | Conservative for shared hosting |
| Timeout | 30 | Seconds |
| Server Load Limit | 1 | Conservative |

### Sitemap Settings Tab
| Setting | Value |
|---------|-------|
| Custom Sitemap | (use AIOSEO sitemap URL) |
| Include Posts | ON |
| Include Pages | ON |
| Include Portfolio | ON |

---

## Debug Settings

Navigate to: **LiteSpeed Cache > Toolbox > Debug**

For production:
| Setting | Value |
|---------|-------|
| Disable All Features | OFF |
| Debug Log | OFF |
| Admin IPs | (leave blank) |
| Debug Level | OFF |

---

## Post-Configuration Checklist

1. [ ] Clear all cache after configuration changes
2. [ ] Test site in incognito mode
3. [ ] Run PageSpeed Insights test
4. [ ] Verify Oxygen Builder editing still works
5. [ ] Test contact forms
6. [ ] Verify mobile responsiveness
7. [ ] Check lazy loading behavior
8. [ ] Monitor for any console errors

---

## Troubleshooting

### Oxygen Builder Issues
If Oxygen editor is broken:
1. Disable CSS Combine
2. Disable JS Combine
3. Clear all cache
4. Purge CDN cache (if applicable)

### Forms Not Working
1. Add form submission URL to "Do Not Cache URIs"
2. Clear cache
3. Test in incognito

### Styling Issues (FOUC)
1. Disable "Load CSS Asynchronously"
2. Disable UCSS generation
3. Clear cache

### Performance Still Slow
1. Enable Object Cache (if Redis available)
2. Check image optimization queue
3. Enable crawler
4. Review PageSpeed recommendations
