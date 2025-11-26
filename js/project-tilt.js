// Smooth mouse-parallax tilt for .project-card
(function () {
  /**
   * Initialize 3D tilt effect for project cards
   */
  function initProjectTilt() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;

    // Add glare element to cards if not present
    cards.forEach(card => {
      if (!card.querySelector('.card-glare')) {
        const glare = document.createElement('div');
        glare.classList.add('card-glare');
        card.appendChild(glare);
      }
      // Ensure 3D context
      card.style.transformStyle = 'preserve-3d';

      // Remove old listeners to prevent duplicates
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseenter', handleEnter);
      card.removeEventListener('mouseleave', handleLeave);
      card.removeEventListener('touchstart', handleEnter);
      card.removeEventListener('touchend', handleLeave);

      // Add new listeners
      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('mouseleave', handleLeave);
      card.addEventListener('touchstart', handleEnter);
      card.addEventListener('touchend', handleLeave);
    });

    console.log(`✅ 3D tilt initialized for ${cards.length} project cards`);
  }

  function handleMove(e) {
    const card = this;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width; // -0.5 -> 0.5 range
    const dy = (e.clientY - cy) / rect.height;

    // Enhanced rotation for more "pop"
    const rotateX = (dy * 20).toFixed(2); // Increased from 12
    const rotateY = (-dx * 20).toFixed(2); // Increased from 12

    // Gentle translation to simulate depth
    const translateZ = Math.min(50, Math.abs((dx + dy) * 50)).toFixed(2);

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
    card.style.transition = 'transform 100ms ease-out';

    // Glare effect
    const glare = card.querySelector('.card-glare');
    if (glare) {
      // Calculate glare position (inverse of mouse position)
      const glareX = (dx + 0.5) * 100;
      const glareY = (dy + 0.5) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 80%)`;
      glare.style.opacity = '1';
    }
  }

  function handleEnter() {
    this.style.willChange = 'transform';
    this.style.transition = 'transform 200ms cubic-bezier(0.22,1,0.36,1)';
    const glare = this.querySelector('.card-glare');
    if (glare) glare.style.opacity = '1';
  }

  function handleLeave() {
    this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    this.style.transition = 'transform 500ms cubic-bezier(0.22,1,0.36,1)';
    this.style.willChange = '';
    const glare = this.querySelector('.card-glare');
    if (glare) glare.style.opacity = '0';
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectTilt);
  } else {
    initProjectTilt();
  }

  // Re-initialize when content is dynamically rendered
  document.addEventListener('contentRendered', function () {
    console.log('🔄 Re-initializing 3D tilt for new content...');
    initProjectTilt();
  });

  // Export for manual re-initialization if needed
  if (typeof window !== 'undefined') {
    window.initProjectTilt = initProjectTilt;
  }
})();
