/**
 * ============================================
 * SKILL ORB COMPONENT
 * ============================================
 * 
 * HOW TO ADD NEW SKILL:
 * 1. Open data/skills.json
 * 2. Add new object with the following fields:
 *    - icon: Emoji or icon character
 *    - name: Skill name
 *    - detail: Skill detail/tools
 *    - orbitSize: CSS value for orbit radius (e.g., "200px")
 *    - delay: Animation delay (e.g., "0s", "1.2s")
 * 3. Save file - new skill appears in orbit instantly
 * 
 * Example:
 * {
 *   "icon": "🔐",
 *   "name": "Cryptography",
 *   "detail": "AES & RSA",
 *   "orbitSize": "250px",
 *   "delay": "7.2s"
 * }
 * 
 * Tips:
 * - Vary orbitSize between 200px-280px for visual variety
 * - Stagger delays for smooth animation (increment by ~1.2s)
 * - Use emojis for icons or Font Awesome classes
 * 
 * ============================================
 */

/**
 * Renders a single skill orb
 * @param {Object} data - Skill data
 * @param {string} data.icon - Icon/emoji
 * @param {string} data.name - Skill name
 * @param {string} data.detail - Skill detail
 * @param {string} data.orbitSize - Orbit radius CSS value
 * @param {string} data.delay - Animation delay
 * @returns {string} HTML string for skill bubble
 */
function SkillOrb(data = {}) {
    const {
        icon = '⭐',
        name = 'Skill',
        detail = '',
        orbitSize = '240px',
        delay = '0s'
    } = data;

    return `
        <div class="skill-bubble" style="--orbit-size: ${orbitSize}; --delay: ${delay};">
            <div class="bubble-content">
                <div class="skill-icon">${icon}</div>
                <div class="skill-name">${name}</div>
                <div class="skill-detail">${detail}</div>
            </div>
        </div>
    `;
}

// Export for use in content-renderer.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillOrb;
}
