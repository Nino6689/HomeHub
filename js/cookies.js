/**
 * Cookie Consent Manager
 * GDPR/UK GDPR compliant cookie consent
 */

(function() {
    'use strict';

    const COOKIE_NAME = 'hhss_cookie_consent';
    const COOKIE_EXPIRY = 365; // days

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
        document.cookie = COOKIE_NAME + '=' + encodeURIComponent(JSON.stringify(preferences)) +
            ';expires=' + date.toUTCString() +
            ';path=/;SameSite=Lax';
    }

    function acceptAll() {
        setConsent({ essential: true, analytics: true, marketing: true, timestamp: Date.now() });
        hideBanner();
        // Update Google Consent Mode v2
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
            });
        }
    }

    function acceptEssential() {
        setConsent({ essential: true, analytics: false, marketing: false, timestamp: Date.now() });
        hideBanner();
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
            // Check if analytics was accepted and update consent mode
            const consent = getConsent();
            if (consent && consent.analytics && typeof gtag === 'function') {
                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'analytics_storage': 'granted'
                });
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
