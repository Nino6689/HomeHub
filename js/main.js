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
        initScrollReveal();
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
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const nav = document.getElementById('nav');

        if (!toggle || !nav) return;

        toggle.addEventListener('click', function() {
            const isOpen = nav.classList.toggle('open');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close on link click
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const header = document.getElementById('header');
                const offset = header ? header.offsetHeight + 20 : 20;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            });
        });
    }

    /**
     * Scroll Animations with Intersection Observer
     */
    function initAnimations() {
        const elements = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .why-item, .stat');

        if (!elements.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(function(el, index) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease ' + (index % 3) * 0.1 + 's, transform 0.6s ease ' + (index % 3) * 0.1 + 's';
            observer.observe(el);
        });
    }

    /**
     * Set Current Year in Footer
     */
    function initYear() {
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    /**
     * Form Validation (for contact page)
     */
    window.validateForm = function(form) {
        const email = form.querySelector('[type="email"]');
        const message = form.querySelector('textarea');

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

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, message) {
        input.classList.add('error');
        const existing = input.parentNode.querySelector('.error-message');
        if (existing) existing.remove();

        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        error.style.cssText = 'color: #ef4444; font-size: 14px; margin-top: 4px; display: block;';
        input.parentNode.appendChild(error);

        input.addEventListener('input', function() {
            input.classList.remove('error');
            const err = input.parentNode.querySelector('.error-message');
            if (err) err.remove();
        }, { once: true });
    }

    /**
     * Lazy Image Loading with fade-in effect
     */
    function initLazyImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');

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
        if (!('IntersectionObserver' in window)) return;

        const links = document.querySelectorAll('a[href^="/"], a[href^="./"]');
        const prefetched = new Set();

        links.forEach(function(link) {
            link.addEventListener('mouseenter', function() {
                const href = link.getAttribute('href');
                if (!href || prefetched.has(href)) return;

                const prefetchLink = document.createElement('link');
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
        // Create progress bar
        const progress = document.createElement('div');
        progress.className = 'scroll-progress';
        document.body.prepend(progress);

        let ticking = false;

        function updateProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
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

    /**
     * Scroll Reveal Animation
     */
    function initScrollReveal() {
        const elements = document.querySelectorAll('.service-card, .testimonial-card, .process-step, .split-image');

        if (!elements.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        elements.forEach(function(el, index) {
            // Stagger the delay based on position
            el.style.transitionDelay = (index % 4) * 0.1 + 's';
            observer.observe(el);
        });
    }

})();
