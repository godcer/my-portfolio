/**
 * ============================================
 * ABOUT PANEL COMPONENT
 * ============================================
 * 
 * HOW TO UPDATE ABOUT SECTION:
 * 1. Open data/about.json
 * 2. Edit the following fields:
 *    - intro: Main introduction paragraph (supports HTML)
 *    - highlights: Array of { title, description } objects
 *    - tags: Array of skill tag strings
 *    - philosophy: Closing statement
 * 3. Save file - changes appear instantly on reload
 * 
 * Example:
 * {
 *   "intro": "I'm <strong>Your Name</strong>, a...",
 *   "highlights": [
 *     { "title": "New Skill", "description": "Description here" }
 *   ],
 *   "tags": ["Tag 1", "Tag 2"],
 *   "philosophy": "Your philosophy..."
 * }
 * 
 * ============================================
 */

/**
 * Renders the About section content
 * @param {Object} data - About data from JSON
 * @param {string} data.intro - Introduction paragraph (HTML allowed)
 * @param {Array} data.highlights - Array of highlight objects
 * @param {Array} data.tags - Array of tag strings
 * @param {string} data.philosophy - Philosophy statement
 * @returns {Object} Object with 'text' and 'tags' HTML strings
 */
function AboutPanel(data = {}) {
    const {
        intro = '',
        highlights = [],
        tags = [],
        philosophy = ''
    } = data;

    // Generate highlights HTML
    const highlightsHTML = highlights.map(highlight => `
        <div>
            <h3>${highlight.title || ''}</h3>
            <p>${highlight.description || ''}</p>
        </div>
    `).join('');

    // Generate tags HTML
    const tagsHTML = tags.map(tag => `
        <li>${tag}</li>
    `).join('');

    // Main text content
    const textHTML = `
        <p class="about-intro">
            ${intro}
        </p>

        <div class="about-highlights">
            ${highlightsHTML}
        </div>

        <ul class="about-tags">
            ${tagsHTML}
        </ul>

        <p class="about-philosophy">
            ${philosophy}
        </p>
    `;

    return {
        text: textHTML,
        tags: tagsHTML
    };
}

// Export for use in content-renderer.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AboutPanel;
}
