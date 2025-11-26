/**
 * Anti-Gravity Physics Engine (V2)
 * High-performance physics simulation for UI elements.
 */

class PhysicsWorld {
    constructor() {
        this.lastTime = 0;
        this.elements = [];
        this.cursor = new CursorSystem();

        // Global Physics Constants
        this.friction = 0.12; // Damping factor
        this.spring = 0.08;   // Return force
        this.floatSpeed = 0.002; // Speed of idle drift

        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!this.isReducedMotion) {
            this.init();
        }
    }

    init() {
        // Initialize Gravity Elements
        const gravityNodes = document.querySelectorAll('[data-gravity]');
        gravityNodes.forEach(node => {
            this.elements.push(new GravityElement(node, this));
        });

        // Initialize Magnetic Elements (Buttons etc)
        const magneticNodes = document.querySelectorAll('[data-magnetic]');
        magneticNodes.forEach(node => {
            this.elements.push(new GravityElement(node, this, { isMagneticOnly: true }));
        });

        // Start Physics Loop
        requestAnimationFrame((t) => this.loop(t));

        // Start Micro-bounce Timer
        setInterval(() => this.triggerMicroBounce(), 15000);
    }

    loop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        // Update Cursor
        this.cursor.update();

        // Update All Elements
        this.elements.forEach(el => el.update(timestamp, this.cursor));

        requestAnimationFrame((t) => this.loop(t));
    }

    triggerMicroBounce() {
        // Randomly nudge 1-3 elements to keep scene alive
        const count = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < count; i++) {
            const randomIdx = Math.floor(Math.random() * this.elements.length);
            const el = this.elements[randomIdx];
            if (el && !el.isHovered) {
                el.applyImpulse(
                    (Math.random() - 0.5) * 5, // vx
                    (Math.random() - 0.5) * 5  // vy
                );
            }
        }
    }
}

class CursorSystem {
    constructor() {
        this.el = document.querySelector('.magnetic-cursor');
        this.follower = document.querySelector('.cursor-follower');

        this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        // Follower lag
        this.lag = 0.15;

        this.initEvents();
    }

    initEvents() {
        window.addEventListener('mousemove', (e) => {
            this.target.x = e.clientX;
            this.target.y = e.clientY;

            // Instant dot update
            if (this.el) {
                this.el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }
        });

        window.addEventListener('mousedown', () => {
            if (this.follower) this.follower.classList.add('active');
        });

        window.addEventListener('mouseup', () => {
            if (this.follower) this.follower.classList.remove('active');
        });
    }

    update() {
        // Lerp follower position
        this.pos.x += (this.target.x - this.pos.x) * this.lag;
        this.pos.y += (this.target.y - this.pos.y) * this.lag;

        if (this.follower) {
            this.follower.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0) translate(-50%, -50%)`;
        }
    }
}

class GravityElement {
    constructor(el, world, options = {}) {
        this.el = el;
        this.world = world;
        this.options = options;

        // Physics State
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.tiltX = 0;
        this.tiltY = 0;

        // Floating Parameters (Randomized)
        this.floatOffset = Math.random() * 1000;
        this.floatSpeed = world.floatSpeed * (0.8 + Math.random() * 0.4);

        // Interaction State
        this.isHovered = false;
        this.rect = this.el.getBoundingClientRect();

        this.initEvents();
    }

    initEvents() {
        this.el.addEventListener('mouseenter', () => {
            this.isHovered = true;
            this.rect = this.el.getBoundingClientRect(); // Update rect on hover
            if (this.world.cursor.follower) {
                this.world.cursor.follower.classList.add('magnetic-active');
            }
        });

        this.el.addEventListener('mouseleave', () => {
            this.isHovered = false;
            if (this.world.cursor.follower) {
                this.world.cursor.follower.classList.remove('magnetic-active');
            }
        });

        // Update rect on resize
        window.addEventListener('resize', () => {
            this.rect = this.el.getBoundingClientRect();
        });
    }

    applyImpulse(forceX, forceY) {
        this.vx += forceX;
        this.vy += forceY;
    }

    update(timestamp, cursor) {
        let targetX = 0;
        let targetY = 0;
        let targetTiltX = 0;
        let targetTiltY = 0;

        // 1. Calculate Forces
        if (this.isHovered) {
            // Magnetic Pull
            const centerX = this.rect.left + this.rect.width / 2;
            const centerY = this.rect.top + this.rect.height / 2;

            const dx = cursor.target.x - centerX;
            const dy = cursor.target.y - centerY;

            // Pull factor (stronger for magnetic items)
            const pullStrength = this.options.isMagneticOnly ? 0.3 : 0.15;

            targetX = dx * pullStrength;
            targetY = dy * pullStrength;

            // Tilt Calculation (Max 10 deg)
            targetTiltX = -(dy / this.rect.height) * 15;
            targetTiltY = (dx / this.rect.width) * 15;

        } else if (!this.options.isMagneticOnly) {
            // Idle Floating (Sine Wave)
            const time = timestamp * this.floatSpeed + this.floatOffset;
            targetX = Math.sin(time) * 4; // 4px range
            targetY = Math.cos(time * 0.8) * 4;
        }

        // 2. Physics Integration (Spring + Friction)
        const ax = (targetX - this.x) * this.world.spring;
        const ay = (targetY - this.y) * this.world.spring;

        this.vx += ax;
        this.vy += ay;

        this.vx *= (1 - this.world.friction);
        this.vy *= (1 - this.world.friction);

        this.x += this.vx;
        this.y += this.vy;

        // Smooth Tilt
        this.tiltX += (targetTiltX - this.tiltX) * 0.1;
        this.tiltY += (targetTiltY - this.tiltY) * 0.1;

        // 3. Render
        // Use translate3d for GPU
        this.el.style.transform = `translate3d(${this.x.toFixed(2)}px, ${this.y.toFixed(2)}px, 0) 
                                   rotateX(${this.tiltX.toFixed(2)}deg) 
                                   rotateY(${this.tiltY.toFixed(2)}deg)`;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new PhysicsWorld();
});
