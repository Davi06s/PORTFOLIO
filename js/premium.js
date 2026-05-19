/* ==========================================================================
   Premium Effects Engine — GSAP ScrollTrigger, Parallax, Typed, Cursor Glow
   ========================================================================== */
(function () {
    'use strict';

    // ── Wait for GSAP ──
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('[Premium] GSAP or ScrollTrigger not loaded.');
        // Fallback: make all reveal elements visible
        document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.reveal-scale').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ────────────────────────────────────────────────────────────────────────
    // 1. SCROLL PROGRESS BAR
    // ────────────────────────────────────────────────────────────────────────
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = progress + '%';
        }, { passive: true });
    }

    // ────────────────────────────────────────────────────────────────────────
    // 2. CURSOR GLOW (desktop only)
    // ────────────────────────────────────────────────────────────────────────
    if (!isMobile && !prefersReduced) {
        const glow = document.querySelector('.cursor-glow');
        if (glow) {
            let mx = -500, my = -500;
            document.addEventListener('mousemove', (e) => {
                mx = e.clientX;
                my = e.clientY;
            }, { passive: true });

            function updateGlow() {
                glow.style.left = mx + 'px';
                glow.style.top = my + 'px';
                requestAnimationFrame(updateGlow);
            }
            updateGlow();
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    // 3. TYPED EFFECT (Hero subtitle)
    // ────────────────────────────────────────────────────────────────────────
    const typedEl = document.getElementById('typedSubtitle');
    if (typedEl && !prefersReduced) {
        const words = ['Full Stack Developer', 'Web App Architect', 'UI/UX Enthusiast', 'Problem Solver'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const current = words[wordIndex];
            if (isDeleting) {
                typedEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typedEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === current.length) {
                typeSpeed = 2000; // pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // pause before next word
            }

            setTimeout(type, typeSpeed);
        }

        // Start after a small delay
        setTimeout(type, 1200);
    } else if (typedEl) {
        typedEl.textContent = 'Full Stack Developer';
    }

    // ────────────────────────────────────────────────────────────────────────
    // 4. GSAP SCROLL REVEAL ANIMATIONS
    // ────────────────────────────────────────────────────────────────────────
    if (!prefersReduced) {
        // Reveal Up
        gsap.utils.toArray('.reveal-up').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // Reveal Left
        gsap.utils.toArray('.reveal-left').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // Reveal Right
        gsap.utils.toArray('.reveal-right').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // Reveal Scale
        gsap.utils.toArray('.reveal-scale').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.4)',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // ── Stagger children in portfolio grid ──
        const portfolioGrid = document.querySelector('#portfolio .row.justify-content-center');
        if (portfolioGrid) {
            gsap.from(portfolioGrid.children, {
                opacity: 0,
                y: 50,
                stagger: 0.15,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: portfolioGrid,
                    start: 'top 80%',
                    once: true
                }
            });
        }

        // ── Timeline items stagger ──
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length) {
            timelineItems.forEach((item, i) => {
                const content = item.querySelector('.timeline-content');
                const dot = item.querySelector('.timeline-dot');
                const fromDir = i % 2 === 0 ? 80 : -80;

                gsap.from(content, {
                    opacity: 0,
                    x: fromDir,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        once: true
                    }
                });

                if (dot) {
                    gsap.from(dot, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.2,
                        ease: 'back.out(2)',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                            once: true
                        }
                    });
                }
            });
        }

        // ── Parallax on scroll for masthead content ──
        const mastheadContainer = document.querySelector('.masthead .container');
        if (mastheadContainer && !isMobile) {
            gsap.to(mastheadContainer, {
                y: 100,
                opacity: 0.3,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.masthead',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // ── Section heading animations ──
        gsap.utils.toArray('.page-section-heading').forEach(heading => {
            gsap.from(heading, {
                opacity: 0,
                y: 30,
                scale: 0.95,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // ── Divider animations ──
        gsap.utils.toArray('.divider-custom').forEach(div => {
            const lines = div.querySelectorAll('.divider-custom-line');
            const icon = div.querySelector('.divider-custom-icon');

            if (icon) {
                gsap.from(icon, {
                    scale: 0,
                    rotation: 180,
                    duration: 0.6,
                    ease: 'back.out(2)',
                    scrollTrigger: {
                        trigger: div,
                        start: 'top 88%',
                        once: true
                    }
                });
            }

            lines.forEach(line => {
                gsap.from(line, {
                    scaleX: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: div,
                        start: 'top 88%',
                        once: true
                    }
                });
            });
        });
    }

    // ────────────────────────────────────────────────────────────────────────
    // 5. COUNTER ANIMATION
    // ────────────────────────────────────────────────────────────────────────
    document.querySelectorAll('.counter-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function () {
                        el.textContent = Math.round(this.targets()[0].val);
                    }
                });
            }
        });
    });

    // ────────────────────────────────────────────────────────────────────────
    // 6. MAGNETIC BUTTONS (desktop only)
    // ────────────────────────────────────────────────────────────────────────
    if (!isMobile && !prefersReduced) {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ────────────────────────────────────────────────────────────────────────
    // 7. 3D CARD TILT (desktop only)
    // ────────────────────────────────────────────────────────────────────────
    if (!isMobile && !prefersReduced) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const rotateX = (0.5 - y) * 12;
                const rotateY = (x - 0.5) * 12;
                card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s ease';
                setTimeout(() => { card.style.transition = ''; }, 500);
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    }

    // ────────────────────────────────────────────────────────────────────────
    // 8. SMOOTH SECTION NAVIGATION
    // ────────────────────────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || targetId === '#page-top') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                gsap.to(window, {
                    scrollTo: { y: targetEl, offsetY: 70 },
                    duration: 1,
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // ────────────────────────────────────────────────────────────────────────
    // 9. NAVBAR HIDE/SHOW ON SCROLL
    // ────────────────────────────────────────────────────────────────────────
    const nav = document.getElementById('mainNav');
    if (nav) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const current = window.scrollY;
            if (current > 300 && current > lastScroll) {
                nav.style.transform = 'translateY(-100%)';
                nav.style.opacity = '0';
            } else {
                nav.style.transform = 'translateY(0)';
                nav.style.opacity = '1';
            }
            lastScroll = current;
        }, { passive: true });
    }

})();
