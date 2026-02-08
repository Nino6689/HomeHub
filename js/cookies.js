/**
 * Cookie Consent Manager
 * GDPR/UK GDPR compliant cookie consent
 */

(function() {
    'use strict';

    const COOKIE_NAME = 'hhss_cookie_consent';
    const COOKIE_EXPIRY = 365; // days
    const analyticsConfig = (window.HHSS && window.HHSS.analytics) || {};
    const GA_ID = analyticsConfig.gaId || 'G-8NKBPS4EK0';
    const CLARITY_ID = analyticsConfig.clarityId || 'pcc68v3lvx';
    let analyticsInitialized = false;

    // Check if consent already given
    function hasConsent() {
        return document.cookie.split(';').some(c => c.trim().startsWith(COOKIE_NAME + '='));
    }

    function getConsent() {
        const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
        if (match) {
            try {
                return JSON.parse(decodeURIComponent(match[2]));
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    function setConsent(preferences) {
        const date = new Date();
        date.setTime(date.getTime() + (COOKIE_EXPIRY * 24 * 60 * 60 * 1000));
        const secureFlag = window.location.protocol === 'https:' ? ';Secure' : '';
        document.cookie = COOKIE_NAME + '=' + encodeURIComponent(JSON.stringify(preferences)) +
            ';expires=' + date.toUTCString() +
            ';path=/;SameSite=Lax' + secureFlag;
    }

    function acceptAll() {
        setConsent({ essential: true, analytics: true, marketing: true, timestamp: Date.now() });
        hideBanner();
        enableAnalytics();
    }

    function acceptEssential() {
        setConsent({ essential: true, analytics: false, marketing: false, timestamp: Date.now() });
        hideBanner();
    }

    function loadScriptOnce(src, onload) {
        if (document.querySelector('script[src="' + src + '"]')) {
            if (onload) onload();
            return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = src;
        if (onload) {
            script.addEventListener('load', onload, { once: true });
        }
        document.head.appendChild(script);
    }

    function enableAnalytics() {
        if (analyticsInitialized) return;
        analyticsInitialized = true;

        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
            });
        }

        if (GA_ID) {
            loadScriptOnce('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID), function() {
                if (typeof gtag === 'function') {
                    gtag('js', new Date());
                    gtag('config', GA_ID);
                }
            });
        }

        if (CLARITY_ID) {
            loadScriptOnce('https://www.clarity.ms/tag/' + encodeURIComponent(CLARITY_ID));
        }
    }

    function hideBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.classList.add('hidden');
            setTimeout(() => banner.remove(), 300);
        }
    }

    function showBanner() {
        if (hasConsent()) {
            const consent = getConsent();
            if (consent && consent.analytics) {
                enableAnalytics();
            }
            return;
        }

        const banner = document.createElement('div');
        banner.id = 'cookieBanner';
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <strong>We value your privacy</strong>
                    <p>We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve your experience and analyse site traffic.</p>
                </div>
                <div class="cookie-buttons">
                    <button id="cookieAcceptAll" class="cookie-btn cookie-btn-primary">Accept All</button>
                    <button id="cookieEssential" class="cookie-btn cookie-btn-secondary">Essential Only</button>
                    <a href="/cookies.html" class="cookie-link">Cookie Policy</a>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById('cookieAcceptAll').addEventListener('click', acceptAll);
        document.getElementById('cookieEssential').addEventListener('click', acceptEssential);

        // Show with animation
        requestAnimationFrame(() => {
            banner.classList.add('visible');
        });
    }

    // Expose functions globally for cookie settings page
    window.CookieConsent = {
        acceptAll: acceptAll,
        acceptEssential: acceptEssential,
        getConsent: getConsent,
        setConsent: setConsent,
        hasConsent: hasConsent
    };

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showBanner);
    } else {
        showBanner();
    }

})();
