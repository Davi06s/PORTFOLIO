/* ==========================================================================
   3D Particle Constellation Engine — Hero Canvas
   ========================================================================== */
(function () {
    'use strict';

    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 65 : 140;
    const CONNECTION_DIST = isMobile ? 120 : 170;
    const MOUSE_RADIUS = 150;

    let width, height;
    let mouse = { x: -9999, y: -9999 };
    let particles = [];
    let animFrame;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * 3 + 1; // depth layer 1-4
            this.vx = (Math.random() - 0.5) * 0.4 / this.z;
            this.vy = (Math.random() - 0.5) * 0.4 / this.z;
            this.baseRadius = (Math.random() * 1.5 + 0.5) / this.z;
            this.radius = this.baseRadius;
            // Color: mix between cyan and purple based on depth
            this.hue = this.z < 2 ? 185 : 270;
            this.alpha = (0.6 / this.z) + 0.1;
        }

        update() {
            // Mouse repulsion
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS) {
                const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                this.vx += (dx / dist) * force * 0.8;
                this.vy += (dy / dist) * force * 0.8;
            }

            // Apply velocity with friction
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.98;
            this.vy *= 0.98;

            // Restore original drift
            this.vx += (Math.random() - 0.5) * 0.02;
            this.vy += (Math.random() - 0.5) * 0.02;

            // Wrap around edges
            if (this.x < -10) this.x = width + 10;
            if (this.x > width + 10) this.x = -10;
            if (this.y < -10) this.y = height + 10;
            if (this.y > height + 10) this.y = -10;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            if (this.hue === 185) {
                ctx.fillStyle = `rgba(0, 240, 255, ${this.alpha})`;
            } else {
                ctx.fillStyle = `rgba(139, 92, 246, ${this.alpha})`;
            }
            ctx.fill();
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i];
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        if (!isMobile) drawConnections();
        animFrame = requestAnimationFrame(animate);
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
        animate();
    }

    // Global mouse tracking relative to viewport window
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });
    window.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    canvas.style.pointerEvents = 'none';

    window.addEventListener('resize', () => {
        resize();
    });

    // Reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Draw static particles once
        resize();
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
        particles.forEach(p => p.draw());
        if (!isMobile) drawConnections();
        return;
    }

    init();
})();
