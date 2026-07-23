/* ==========================================================================
   Anime.js Premium Effects Engine — High-Performance Micro-Animations
   ========================================================================== */
(function () {
    'use strict';

    if (typeof anime === 'undefined') {
        console.warn('[AnimeEffects] anime.js not detected.');
        return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    document.addEventListener('DOMContentLoaded', () => {
        initHeroAnimations();
        initSvgOutlineAnimations();
        initAboutAndBadgesAnimations();
        initStatsCounters();
        initCompetenzeGridAnimations();
        initTimelineAnimations();
        initCertificatiAnimations();
        initContactFormAnimations();
        initInteractiveClickEffects();
    });

    // ────────────────────────────────────────────────────────────────────────
    // 1. HERO & BACKGROUND FLOATING SHAPES
    // ────────────────────────────────────────────────────────────────────────
    function initHeroAnimations() {
        const shapes = document.querySelectorAll('.floating-shapes .floating-shape');
        shapes.forEach((shape, index) => {
            // Give each floating shape unique organical movement path with anime.js
            anime({
                targets: shape,
                translateY: [
                    { value: -25 * (index + 1), duration: 2500 + index * 500 },
                    { value: 20 * (index + 1), duration: 3000 + index * 400 },
                    { value: 0, duration: 2200 }
                ],
                translateX: [
                    { value: 15 * (index % 2 === 0 ? 1 : -1), duration: 2800 },
                    { value: -15 * (index % 2 === 0 ? 1 : -1), duration: 3200 },
                    { value: 0, duration: 2400 }
                ],
                rotate: [
                    { value: (index + 1) * 45, duration: 4000 },
                    { value: 0, duration: 3500 }
                ],
                scale: [
                    { value: 1.15, duration: 2000 },
                    { value: 0.9, duration: 2500 },
                    { value: 1, duration: 2000 }
                ],
                opacity: [
                    { value: 0.6, duration: 2000 },
                    { value: 0.2, duration: 2000 },
                    { value: 0.4, duration: 2000 }
                ],
                easing: 'easeInOutSine',
                loop: true,
                delay: index * 300
            });
        });

        // Masthead Avatar Elastic Entrance & Pulse
        const avatar = document.querySelector('.masthead-avatar');
        if (avatar) {
            anime({
                targets: avatar,
                scale: [0.7, 1],
                opacity: [0, 1],
                duration: 1200,
                easing: 'easeOutElastic(1, 0.5)',
                delay: 200
            });

            avatar.addEventListener('mouseenter', () => {
                anime({
                    targets: avatar,
                    scale: 1.08,
                    rotate: [0, -3, 3, 0],
                    duration: 600,
                    easing: 'easeOutElastic(1, 0.4)'
                });
            });

            avatar.addEventListener('mouseleave', () => {
                anime({
                    targets: avatar,
                    scale: 1,
                    rotate: 0,
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            });
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    // 2. SVG OUTLINES & PATH DRAWING
    // ────────────────────────────────────────────────────────────────────────
    function initSvgOutlineAnimations() {
        // Floating Phone Navbar SVG Rect Outline Drawing
        const navRect = document.querySelector('.header-svg-nav .outline .rect');
        if (navRect) {
            anime({
                targets: navRect,
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: 2500,
                easing: 'easeInOutQuart',
                delay: 500
            });
        }

        // CV Card Silhouette SVG Path Animation on Scroll
        const cvSilhouettes = document.querySelectorAll('.cv-silhouette-outer path, .cv-silhouette-inner path');
        if (cvSilhouettes.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: cvSilhouettes,
                            strokeDashoffset: [anime.setDashoffset, 0],
                            opacity: [0, 0.4],
                            duration: 2000,
                            delay: anime.stagger(200),
                            easing: 'easeInOutCubic'
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });

            const cvCard = document.querySelector('.cv-3d-card');
            if (cvCard) observer.observe(cvCard);
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    // 3. ABOUT SECTION & SKILL BADGES
    // ────────────────────────────────────────────────────────────────────────
    function initAboutAndBadgesAnimations() {
        const badgesContainer = document.querySelector('#about .d-flex.flex-wrap');
        if (badgesContainer) {
            const badges = badgesContainer.querySelectorAll('.badge');

            // Staggered Entrance on Scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: badges,
                            translateY: [20, 0],
                            opacity: [0, 1],
                            scale: [0.8, 1],
                            delay: anime.stagger(60, { start: 200 }),
                            duration: 700,
                            easing: 'easeOutBack'
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(badgesContainer);

            // Interactive Spring Wobble on Badge Hover
            badges.forEach(badge => {
                badge.addEventListener('mouseenter', () => {
                    anime({
                        targets: badge,
                        scale: 1.15,
                        translateY: -4,
                        duration: 400,
                        easing: 'easeOutElastic(1, 0.5)'
                    });
                });

                badge.addEventListener('mouseleave', () => {
                    anime({
                        targets: badge,
                        scale: 1,
                        translateY: 0,
                        duration: 350,
                        easing: 'easeOutQuad'
                    });
                });
            });
        }

        // CV Download Button Icon Motion
        const cvBtn = document.querySelector('.cv-download-btn');
        if (cvBtn) {
            const icon = cvBtn.querySelector('.cv-download-icon');
            if (icon) {
                cvBtn.addEventListener('mouseenter', () => {
                    anime({
                        targets: icon,
                        translateY: [0, 5, 0],
                        duration: 700,
                        easing: 'easeOutElastic(1, 0.4)',
                        loop: 2
                    });
                });
            }
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    // 4. STATS COUNTERS VALUE INTERPOLATION
    // ────────────────────────────────────────────────────────────────────────
    function initStatsCounters() {
        const counterEls = document.querySelectorAll('.counter-number');
        if (!counterEls.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const targetVal = parseInt(el.getAttribute('data-target'), 10);
                    if (!isNaN(targetVal)) {
                        const obj = { count: 0 };
                        anime({
                            targets: obj,
                            count: targetVal,
                            round: 1,
                            duration: 2000,
                            easing: 'easeOutExpo',
                            update: function () {
                                el.textContent = obj.count;
                            }
                        });

                        // Subtle scale bounce for the stat box
                        anime({
                            targets: el.closest('.stat-item'),
                            scale: [0.9, 1.05, 1],
                            duration: 800,
                            easing: 'easeOutBack'
                        });
                    }
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counterEls.forEach(el => observer.observe(el));
    }

    // ────────────────────────────────────────────────────────────────────────
    // 5. COMPETENZE / SERVICES GRID CARDS
    // ────────────────────────────────────────────────────────────────────────
    function initCompetenzeGridAnimations() {
        const serviceItems = document.querySelectorAll('.service-item');
        if (!serviceItems.length) return;

        serviceItems.forEach(item => {
            const topBar = item.querySelector('.skill-top-bar');
            const icon = item.querySelector('.service-icon');
            const chips = item.querySelectorAll('.tech-chip');
            const numBadge = item.querySelector('.service-num-badge');

            item.addEventListener('mouseenter', () => {
                // Animate Top Bar Glow Line
                if (topBar) {
                    anime({
                        targets: topBar,
                        height: ['3px', '6px'],
                        boxShadow: '0 0 12px var(--accent-primary)',
                        duration: 350,
                        easing: 'easeOutQuad'
                    });
                }

                // Spin and Scale Service Icon
                if (icon) {
                    anime({
                        targets: icon,
                        scale: [1, 1.25, 1.15],
                        rotate: '1turn',
                        duration: 700,
                        easing: 'easeOutElastic(1, 0.5)'
                    });
                }

                // Stagger Pop Tech Chips
                if (chips.length) {
                    anime({
                        targets: chips,
                        translateY: [-3, 0],
                        scale: [0.95, 1.08, 1],
                        delay: anime.stagger(50),
                        duration: 400,
                        easing: 'easeOutBack'
                    });
                }

                // Number Badge Pulse
                if (numBadge) {
                    anime({
                        targets: numBadge,
                        scale: [1, 1.2, 1],
                        duration: 450,
                        easing: 'easeOutBack'
                    });
                }
            });

            item.addEventListener('mouseleave', () => {
                if (topBar) {
                    anime({
                        targets: topBar,
                        height: '3px',
                        boxShadow: 'none',
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }

                if (icon) {
                    anime({
                        targets: icon,
                        scale: 1,
                        rotate: 0,
                        duration: 400,
                        easing: 'easeOutQuad'
                    });
                }
            });
        });
    }

    // ────────────────────────────────────────────────────────────────────────
    // 6. TIMELINE PULSE RINGS & NODE SLIDE
    // ────────────────────────────────────────────────────────────────────────
    function initTimelineAnimations() {
        const dots = document.querySelectorAll('.timeline-dot');
        dots.forEach((dot, idx) => {
            // Pulse node core ring on hover or scroll
            dot.addEventListener('mouseenter', () => {
                anime({
                    targets: dot,
                    scale: [1, 1.4, 1.2],
                    duration: 500,
                    easing: 'easeOutElastic(1, 0.5)'
                });
            });

            dot.addEventListener('mouseleave', () => {
                anime({
                    targets: dot,
                    scale: 1,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });
        });

        // Timeline Icons subtle bounce on hover
        const icons = document.querySelectorAll('.timeline-icon');
        icons.forEach(icon => {
            const parentContent = icon.closest('.timeline-content');
            if (parentContent) {
                parentContent.addEventListener('mouseenter', () => {
                    anime({
                        targets: icon,
                        rotate: [0, -15, 15, 0],
                        scale: [1, 1.2, 1],
                        duration: 600,
                        easing: 'easeOutBack'
                    });
                });
            }
        });
    }

    // ────────────────────────────────────────────────────────────────────────
    // 7. CERTIFICATI CARDS & PDF BUTTONS
    // ────────────────────────────────────────────────────────────────────────
    function initCertificatiAnimations() {
        const certCards = document.querySelectorAll('#certificati .portfolio-item, #certificati .cert-card');
        certCards.forEach(card => {
            const pdfIcon = card.querySelector('.bi-file-earmark-pdf, svg, img');
            const btn = card.querySelector('.btn-outline-primary');

            card.addEventListener('mouseenter', () => {
                if (pdfIcon) {
                    anime({
                        targets: pdfIcon,
                        scale: [1, 1.15, 1.08],
                        rotate: [0, -8, 8, 0],
                        duration: 700,
                        easing: 'easeOutElastic(1, 0.5)'
                    });
                }

                if (btn) {
                    anime({
                        targets: btn,
                        scale: 1.05,
                        duration: 300,
                        easing: 'easeOutBack'
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                if (pdfIcon) {
                    anime({
                        targets: pdfIcon,
                        scale: 1,
                        rotate: 0,
                        duration: 400,
                        easing: 'easeOutQuad'
                    });
                }

                if (btn) {
                    anime({
                        targets: btn,
                        scale: 1,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            });
        });
    }

    // ────────────────────────────────────────────────────────────────────────
    // 8. CONTACT FORM INPUT GLOW & SUBMIT BUTTON FX
    // ────────────────────────────────────────────────────────────────────────
    function initContactFormAnimations() {
        const inputs = document.querySelectorAll('.custom-contact-form .input-field, .custom-contact-form textarea');
        inputs.forEach(input => {
            const fieldParent = input.closest('.field');
            const icon = fieldParent ? fieldParent.querySelector('.input-icon') : null;

            input.addEventListener('focus', () => {
                if (icon) {
                    anime({
                        targets: icon,
                        scale: [1, 1.25],
                        color: ['#8f9ba8', '#00f0ff'],
                        duration: 350,
                        easing: 'easeOutBack'
                    });
                }
            });

            input.addEventListener('blur', () => {
                if (icon) {
                    anime({
                        targets: icon,
                        scale: 1,
                        color: '#8f9ba8',
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            });
        });

        // Submit Button Compression Effect
        const submitBtn = document.querySelector('#contactForm button[type="submit"], #submitButton');
        if (submitBtn) {
            submitBtn.addEventListener('mousedown', () => {
                anime({
                    targets: submitBtn,
                    scale: 0.94,
                    duration: 150,
                    easing: 'easeOutQuad'
                });
            });

            submitBtn.addEventListener('mouseup', () => {
                anime({
                    targets: submitBtn,
                    scale: 1,
                    duration: 400,
                    easing: 'easeOutElastic(1, 0.4)'
                });
            });
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    // 9. INTERACTIVE RIPPLE EFFECT ON BUTTON CLICKS
    // ────────────────────────────────────────────────────────────────────────
    function initInteractiveClickEffects() {
        const interactiveBtns = document.querySelectorAll('.btn, .nav-link, .card-stack-item, .portfolio-item');
        interactiveBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rect = btn.getBoundingClientRect();
                const circle = document.createElement('span');
                const diameter = Math.max(rect.width, rect.height);
                const radius = diameter / 2;

                circle.style.width = circle.style.height = `${diameter}px`;
                circle.style.left = `${e.clientX - rect.left - radius}px`;
                circle.style.top = `${e.clientY - rect.top - radius}px`;
                circle.style.position = 'absolute';
                circle.style.borderRadius = '50%';
                circle.style.backgroundColor = 'rgba(0, 240, 255, 0.35)';
                circle.style.pointerEvents = 'none';
                circle.style.zIndex = '9999';

                if (getComputedStyle(btn).position === 'static') {
                    btn.style.position = 'relative';
                }

                btn.appendChild(circle);

                anime({
                    targets: circle,
                    scale: [0, 2.5],
                    opacity: [0.6, 0],
                    duration: 650,
                    easing: 'easeOutExpo',
                    complete: () => {
                        circle.remove();
                    }
                });
            });
        });
    }

})();
