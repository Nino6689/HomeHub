/**
 * HomeHub - Main JavaScript
 * Lightweight, vanilla JS for optimal performance
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initHeader();
        initMobileMenu();
        initSmoothScroll();
        initAnimations();
        initYear();
        initLazyImages();
        initPrefetch();
        initScrollProgress();
    }

    /**
     * Sticky Header
     */
    function initHeader() {
        const header = document.getElementById('header');
        if (!header) return;

        let lastScroll = 0;
        let ticking = false;

        function updateHeader() {
            const scroll = window.pageYOffset;

            if (scroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = scroll;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });

        updateHeader();
    }

    /**
     * Mobile Menu Toggle with Focus Trap
     */
    function initMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const nav = document.getElementById('nav');

        if (!toggle || !nav) return;

        function closeMenu() {
            nav.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            toggle.focus();
        }

        toggle.addEventListener('click', function() {
            const isOpen = nav.classList.toggle('open');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';

            // Focus trap: focus first link when menu opens
            if (isOpen) {
                var firstLink = nav.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });

        // Close on link click
        nav.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                closeMenu();
            }
        });

        // Keyboard handling
        document.addEventListener('keydown', function(e) {
            if (!nav.classList.contains('open')) return;

            // Close on escape
            if (e.key === 'Escape') {
                closeMenu();
                return;
            }

            // Focus trap: cycle focus within menu
            if (e.key === 'Tab') {
                var focusable = nav.querySelectorAll('a, button');
                if (!focusable.length) return;

                var first = focusable[0];
                var last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href === '#') return;

                var target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                var header = document.getElementById('header');
                var offset = header ? header.offsetHeight + 20 : 20;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            });
        });
    }

    /**
     * Scroll Animations with Intersection Observer
     * Consolidated: handles both fade-in and visibility reveal
     */
    function initAnimations() {
        if (!('IntersectionObserver' in window)) return;

        // Fade-in cards
        var fadeElements = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .why-item, .stat');
        if (fadeElements.length) {
            var fadeObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('visible');
                        fadeObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            fadeElements.forEach(function(el, index) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease ' + (index % 3) * 0.1 + 's, transform 0.6s ease ' + (index % 3) * 0.1 + 's';
                el.style.transitionDelay = (index % 4) * 0.1 + 's';
                fadeObserver.observe(el);
            });
        }

        // Reveal elements (process steps, split images)
        var revealElements = document.querySelectorAll('.process-step, .split-image');
        if (revealElements.length) {
            var revealObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -60px 0px'
            });

            revealElements.forEach(function(el, index) {
                el.style.transitionDelay = (index % 4) * 0.1 + 's';
                revealObserver.observe(el);
            });
        }
    }

    /**
     * Set Current Year in Footer
     */
    function initYear() {
        var yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    /**
     * Form Validation (for contact page)
     */
    window.HHSS = window.HHSS || {};
    window.HHSS.validateForm = function(form) {
        var email = form.querySelector('[type="email"]');
        var message = form.querySelector('textarea');

        if (email && !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            return false;
        }

        if (message && message.value.trim().length < 10) {
            showError(message, 'Please enter a message (at least 10 characters)');
            return false;
        }

        return true;
    };

    // Keep backward compat
    window.validateForm = window.HHSS.validateForm;

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, message) {
        input.classList.add('error');
        var existing = input.parentNode.querySelector('.error-message');
        if (existing) existing.remove();

        var error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        error.style.cssText = 'color: #ef4444; font-size: 14px; margin-top: 4px; display: block;';
        input.parentNode.appendChild(error);

        input.addEventListener('input', function() {
            input.classList.remove('error');
            var err = input.parentNode.querySelector('.error-message');
            if (err) err.remove();
        }, { once: true });
    }

    /**
     * Lazy Image Loading with fade-in effect
     */
    function initLazyImages() {
        var images = document.querySelectorAll('img[loading="lazy"]');

        images.forEach(function(img) {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    img.classList.add('loaded');
                }, { once: true });
            }
        });
    }

    /**
     * Prefetch linked pages on hover for faster navigation
     */
    function initPrefetch() {
        var links = document.querySelectorAll('a[href^="/"], a[href^="./"]');
        var prefetched = new Set();

        links.forEach(function(link) {
            link.addEventListener('mouseenter', function() {
                var href = link.getAttribute('href');
                if (!href || prefetched.has(href)) return;

                var prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);
                prefetched.add(href);
            }, { once: true, passive: true });
        });
    }

    /**
     * Scroll Progress Indicator
     */
    function initScrollProgress() {
        var progress = document.createElement('div');
        progress.className = 'scroll-progress';
        document.body.prepend(progress);

        var ticking = false;

        function updateProgress() {
            var scrollTop = window.pageYOffset;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var scrollPercent = scrollTop / docHeight;
            progress.style.transform = 'scaleX(' + scrollPercent + ')';
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });
    }

})();
