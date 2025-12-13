/**
 * Page Loader System
 * Handles the initial entry transition to prevent FOUC (Flash of Unstyled Content).
 * Optimized for performance: minimal logic, removed immediately after use.
 */

window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');

    // Safety check: if loader doesn't exist, we do nothing
    if (!loader) return;

    // Minimum display time to ensure smooth transition (800ms)
    // This gives time for the canvas/webgl to initialize under the hood.
    setTimeout(() => {
        // Trigger CSS transition
        loader.classList.add('fade-out');

        // Remove from DOM entirely to free up memory and stacking context
        setTimeout(() => {
            loader.remove();
            // Signal that the site is ready (useful for other scripts)
            document.body.classList.add('site-loaded');
        }, 800); // Matches CSS transition duration
    }, 800);
});
