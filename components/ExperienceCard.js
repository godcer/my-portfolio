/**
 * ============================================
 * EXPERIENCE CARD COMPONENT
 * ============================================
 * 
 * HOW TO ADD NEW EXPERIENCE:
 * 1. Open data/experience.json
 * 2. Add new object with the following fields:
 *    - title: Job title
 *    - company: Company name and year
 *    - chip: Achievement badge text
 *    - colorClass: "red", "blue", or "green" (for subtle tint)
 * 3. Save file - new card appears instantly on reload
 * 
 * Example:
 * {
 *   "title": "Security Analyst",
 *   "company": "ABC Corp • 2025",
 *   "chip": "50+ Audits",
 *   "colorClass": "blue"
 * }
 * 
 * Available color classes: red, blue, green
 * 
 * ============================================
 */

/**
 * Renders a single experience card
 * @param {Object} data - Experience data
 * @param {string} data.title - Job title
 * @param {string} data.company - Company and year
 * @param {string} data.chip - Achievement chip text
 * @param {string} data.colorClass - Color class (red/blue/green)
 * @returns {string} HTML string for experience card
 */
function ExperienceCard(data = {}) {
    const {
        title = 'Untitled Position',
        company = '',
        chip = '',
        colorClass = 'blue'
    } = data;

    return `
        <div class="card ${colorClass}">
            <p class="tip">${title}</p>
            <p class="second-text">${company}</p>
            <span class="exp-chip">${chip}</span>
        </div>
    `;
}

// Export for use in content-renderer.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExperienceCard;
}
