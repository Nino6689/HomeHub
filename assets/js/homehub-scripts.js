/**
 * HomeHub Custom Scripts
 *
 * Add this code via WPCode (Insert Headers and Footers plugin)
 * or include in Oxygen's Global Settings > Scripts
 *
 * @package HomeHub
 * @version 1.0.0
 */

(function() {
    'use strict';

    /**
     * Wait for DOM to be ready
     */
    function domReady(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    domReady(function() {
        initStickyHeader();
        initSmoothScroll();
        initMobileMenu();
        initAnimateOnScroll();
        initProjectCardHover();
    });

    /**
     * Sticky Header with Glass Effect
     * Adds 'scrolled' class when page is scrolled past threshold
     */
    function initStickyHeader() {
        const header = document.querySelector('.header, .oxy-header, [class*="header"]');
        if (!header) return;

        const scrollThreshold = 50;
        let lastScroll = 0;
        let ticking = false;

        function updateHeader() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Optional: Hide header on scroll down, show on scroll up
            // Uncomment if you want this behavior
            /*
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            */

            lastScroll = currentScroll;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });

        // Initial check
        updateHeader();
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();

                const headerHeight = document.querySelector('.header, .oxy-header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            });
        });
    }

    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        const menuToggle = document.querySelector('.header-menu-toggle, .mobile-menu-toggle');
        const mobileMenu = document.querySelector('.header-nav, .mobile-menu');

        if (!menuToggle || !mobileMenu) return;

        menuToggle.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('is-open');

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }

    function openMobileMenu() {
        const mobileMenu = document.querySelector('.header-nav, .mobile-menu');
        const menuToggle = document.querySelector('.header-menu-toggle, .mobile-menu-toggle');

        if (mobileMenu) {
            mobileMenu.classList.add('is-open');
            document.body.classList.add('menu-open');
        }
        if (menuToggle) {
            menuToggle.classList.add('is-active');
            menuToggle.setAttribute('aria-expanded', 'true');
        }
    }

    function closeMobileMenu() {
        const mobileMenu = document.querySelector('.header-nav, .mobile-menu');
        const menuToggle = document.querySelector('.header-menu-toggle, .mobile-menu-toggle');

        if (mobileMenu) {
            mobileMenu.classList.remove('is-open');
            document.body.classList.remove('menu-open');
        }
        if (menuToggle) {
            menuToggle.classList.remove('is-active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    /**
     * Animate Elements on Scroll
     * Uses Intersection Observer for performance
     */
    function initAnimateOnScroll() {
        const animatedElements = document.querySelectorAll('[data-animate], .animate-on-scroll');

        if (!animatedElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animation = el.dataset.animate || 'fade-in';
                    const delay = el.dataset.delay || 0;

                    setTimeout(function() {
                        el.classList.add('is-visible', 'animate-' + animation);
                    }, delay);

                    // Unobserve after animation triggers
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        animatedElements.forEach(function(el) {
            el.classList.add('animate-init');
            observer.observe(el);
        });
    }

    /**
     * Project Card Hover Enhancement
     * Adds smooth entrance for overlay content
     */
    function initProjectCardHover() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(function(card) {
            const overlay = card.querySelector('.project-card-overlay');
            if (!overlay) return;

            // Stagger animation for overlay children
            const children = overlay.children;
            Array.from(children).forEach(function(child, index) {
                child.style.transitionDelay = (index * 0.05) + 's';
            });
        });
    }

    /**
     * Form Enhancement
     * Adds focus states and validation feedback
     */
    function initFormEnhancements() {
        const forms = document.querySelectorAll('form');

        forms.forEach(function(form) {
            const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');

            inputs.forEach(function(input) {
                // Add filled class when input has value
                input.addEventListener('blur', function() {
                    if (this.value) {
                        this.classList.add('is-filled');
                    } else {
                        this.classList.remove('is-filled');
                    }
                });

                // Check on load
                if (input.value) {
                    input.classList.add('is-filled');
                }
            });
        });
    }

    /**
     * Lazy Load Background Images
     * For elements with data-bg attribute
     */
    function initLazyBackgrounds() {
        const lazyBackgrounds = document.querySelectorAll('[data-bg]');

        if (!lazyBackgrounds.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '200px 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const bgUrl = el.dataset.bg;

                    if (bgUrl) {
                        el.style.backgroundImage = 'url(' + bgUrl + ')';
                        el.classList.add('bg-loaded');
                    }

                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        lazyBackgrounds.forEach(function(el) {
            observer.observe(el);
        });
    }

    /**
     * Counter Animation
     * For statistics/numbers that count up
     */
    function initCounterAnimation() {
        const counters = document.querySelectorAll('[data-counter]');

        if (!counters.length) return;

        const observerOptions = {
            root: null,
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.counter, 10);
                    const duration = parseInt(el.dataset.duration, 10) || 2000;
                    const suffix = el.dataset.suffix || '';
                    const prefix = el.dataset.prefix || '';

                    animateCounter(el, 0, target, duration, prefix, suffix);
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        counters.forEach(function(el) {
            observer.observe(el);
        });
    }

    function animateCounter(el, start, end, duration, prefix, suffix) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out-quad)
            const easeProgress = 1 - (1 - progress) * (1 - progress);

            const current = Math.floor(start + (end - start) * easeProgress);
            el.textContent = prefix + current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

})();

/**
 * CSS for Animation States
 * Add to your CSS file or in Oxygen's global styles:
 *
 * .animate-init {
 *     opacity: 0;
 *     transform: translateY(20px);
 * }
 *
 * .animate-init.is-visible {
 *     opacity: 1;
 *     transform: translateY(0);
 *     transition: opacity 0.6s ease, transform 0.6s ease;
 * }
 *
 * .header.header-hidden {
 *     transform: translateY(-100%);
 * }
 *
 * body.menu-open {
 *     overflow: hidden;
 * }
 */
