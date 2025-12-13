/**
 * High-Performance Scroll Spy & Navbar System
 * Uses IntersectionObserver for 60fps performance without heavy scroll listeners.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Config
    const SCROLL_THRESHOLD = 50; // px

    // --- 1. Navbar Scrolled State (Background Blur) ---
    // We observe the top pixel of the page or the hero section to toggle the .scrolled class.

    // Create a sentinel element at the top of the body for precise tracking
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.left = '0';
    sentinel.style.width = '100%';
    sentinel.style.height = '50px'; // Corresponds to threshold
    sentinel.style.pointerEvents = 'none';
    sentinel.style.visibility = 'hidden';
    document.body.prepend(sentinel);

    const headerObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        // If sentinel is NOT intersecting (scrolled past it), add .scrolled
        if (!entry.isIntersecting) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, {
        root: null,
        threshold: 0,
        rootMargin: '0px'
    });

    headerObserver.observe(sentinel);


    // --- 2. Active Link Scroll Spy ---
    // Highlights the navbar link corresponding to the section currently in the middle of value viewport.

    const observerOptions = {
        root: null,
        // Shrink the viewport to a central horizontal line
        // content exiting the top or entering the bottom won't trigger until it hits the middle
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);

                if (matchingLink) {
                    matchingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
