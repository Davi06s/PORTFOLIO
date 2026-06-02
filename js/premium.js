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
                // Security/Performance note: using transform: translate to force hardware acceleration
                // and avoid layout thrashing caused by animating top/left properties.
                glow.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
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

    // ────────────────────────────────────────────────────────────────────────
    // 10. MARQUEE SECTION DYNAMIC LOADING & ANIMATION
    // ────────────────────────────────────────────────────────────────────────
    const marqueeRow1 = document.getElementById('marqueeRow1');
    const marqueeRow2 = document.getElementById('marqueeRow2');
    if (marqueeRow1 && marqueeRow2) {
        const images = [
            "assets/img/portfolio/dopo.png",
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=420&h=270&q=80",
            "assets/img/portfolio/r-type.webp",
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=420&h=270&q=80",
            "assets/img/portfolio/trello.png",
            "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=420&h=270&q=80",
            "assets/img/portfolio/slack.png",
            "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=420&h=270&q=80",
            "assets/img/portfolio/preview.gif",
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=420&h=270&q=80",
            "assets/img/portfolio/prima.png",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=420&h=270&q=80",
            "assets/img/portfolio/dopo.png",
            "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=420&h=270&q=80",
            "assets/img/portfolio/trello.png",
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=420&h=270&q=80"
        ];

        const createMarqueeTrack = (row, imgList, reverse = false) => {
            const track = document.createElement('div');
            track.className = 'marquee-track';

            // Triple the elements to ensure smooth continuous loop
            const tripled = [...imgList, ...imgList, ...imgList];
            if (reverse) tripled.reverse();

            tripled.forEach((src, idx) => {
                const img = document.createElement('img');
                img.src = src;
                img.className = 'marquee-tile';
                img.alt = `Project Preview ${idx + 1}`;
                img.loading = 'lazy';
                track.appendChild(img);
            });

            row.appendChild(track);
            return track;
        };

        const track1 = createMarqueeTrack(marqueeRow1, images, false);
        const track2 = createMarqueeTrack(marqueeRow2, images, true);

        if (!prefersReduced) {
            // Auto-scrolling tween: moves xPercent continuously
            gsap.to(track1, {
                xPercent: -33.333,
                ease: 'none',
                repeat: -1,
                duration: 35
            });

            gsap.set(track2, { xPercent: -33.333 });
            gsap.to(track2, {
                xPercent: 0,
                ease: 'none',
                repeat: -1,
                duration: 35
            });

            // Scroll-based parallax translations
            gsap.to(track1, {
                x: -300,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#marquee',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.to(track2, {
                x: 300,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#marquee',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    // 11. TEXT CHARACTER SPLITTER & SCROLL REVEAL
    // ────────────────────────────────────────────────────────────────────────
    const charRevealElements = document.querySelectorAll('.char-scroll-reveal');
    if (charRevealElements.length && !prefersReduced) {
        charRevealElements.forEach(el => {
            const text = el.textContent.replace(/\s+/g, ' ').trim();
            el.innerHTML = ''; // clear original text

            const chars = Array.from(text);
            chars.forEach(char => {
                if (char === ' ') {
                    const spaceSpan = document.createElement('span');
                    spaceSpan.innerHTML = '&nbsp;';
                    el.appendChild(spaceSpan);
                } else {
                    const wrap = document.createElement('span');
                    wrap.className = 'char-wrap';

                    const placeholder = document.createElement('span');
                    placeholder.className = 'char-placeholder';
                    placeholder.textContent = char;

                    const anim = document.createElement('span');
                    anim.className = 'char-anim';
                    anim.textContent = char;

                    wrap.appendChild(placeholder);
                    wrap.appendChild(anim);
                    el.appendChild(wrap);
                }
            });

            // Animate the anim characters
            const anims = el.querySelectorAll('.char-anim');
            gsap.fromTo(anims, 
                { opacity: 0 },
                {
                    opacity: 1,
                    stagger: 0.05,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        end: 'bottom 50%',
                        scrub: true
                    }
                }
            );
        });
    }

    // ────────────────────────────────────────────────────────────────────────
    // 12. CORNER DECORS FADE-IN
    // ────────────────────────────────────────────────────────────────────────
    const decors = document.querySelectorAll('.about-decor');
    if (decors.length && !isMobile && !prefersReduced) {
        gsap.fromTo(decors, 
            { 
                opacity: 0, 
                scale: 0.8,
                y: (i, target) => {
                    return (target.classList.contains('decor-top-left') || target.classList.contains('decor-top-right')) ? -60 : 60;
                }
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top 75%',
                    once: true
                }
            }
        );
    }

    // ────────────────────────────────────────────────────────────────────────
    // 13. SERVICES STAGGERED REVEAL
    // ────────────────────────────────────────────────────────────────────────
    const serviceItems = document.querySelectorAll('.services-list .reveal-item');
    if (serviceItems.length && !prefersReduced) {
        gsap.to(serviceItems, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.services-list',
                start: 'top 85%',
                once: true
            }
        });
    } else if (serviceItems.length) {
        serviceItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'none';
        });
    }

    // ────────────────────────────────────────────────────────────────────────
    // 14. STICKY STACKING CARDS
    // ────────────────────────────────────────────────────────────────────────
    const cardWrappers = document.querySelectorAll('.project-stack-card-wrapper');
    if (cardWrappers.length) {
        // Set dynamic top positions to avoid overlap and create stacking offsets
        cardWrappers.forEach((wrapper, index) => {
            if (!isMobile) {
                // Dynamic top offsets: e.g. 80px base + 28px * index
                wrapper.style.top = (80 + index * 28) + 'px';
            } else {
                wrapper.style.top = 'auto';
            }
        });

        // Scroll animation to scale and darken card as the next one stacks over it
        if (!isMobile && !prefersReduced && cardWrappers.length > 1) {
            cardWrappers.forEach((wrapper, index) => {
                if (index === cardWrappers.length - 1) return; // Last card doesn't need to scale down

                const card = wrapper.querySelector('.project-stack-card');
                const nextWrapper = cardWrappers[index + 1];

                gsap.to(card, {
                    scale: 0.93 - (cardWrappers.length - index) * 0.01,
                    opacity: 0.45,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: nextWrapper,
                        start: 'top 85%',
                        end: 'top 20%',
                        scrub: true
                    }
                });
            });
        }
    }

})();
