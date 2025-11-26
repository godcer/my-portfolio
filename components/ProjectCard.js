/**
 * ============================================
 * PROJECT CARD COMPONENT
 * ============================================
 * 
 * HOW TO ADD NEW PROJECT:
 * 1. Open data/projects.json
 * 2. Add new object with the following fields:
 *    - title: Project name
 *    - description: Brief description
 *    - buttonText: Button label
 *    - link: Project URL or "#"
 * 3. Save file - new project card appears instantly
 * 
 * Example:
 * {
 *   "title": "Secure Chat App",
 *   "description": "End-to-end encrypted messaging with PFS.",
 *   "buttonText": "View Project",
 *   "link": "https://github.com/..."
 * }
 * 
 * Note: 3D tilt effect is automatically applied by project-tilt.js
 * 
 * ============================================
 */

/**
 * Renders a single project card
 * @param {Object} data - Project data
 * @param {string} data.title - Project title
 * @param {string} data.description - Project description
 * @param {string} data.buttonText - Button text
 * @param {string} data.link - Project link
 * @returns {string} HTML string for project card
 */
function ProjectCard(data = {}) {
    const {
        title = 'Project',
        description = '',
        buttonText = 'View Project',
        link = '#'
    } = data;

    return `
        <div class="project-card glass">
            <h3>${title}</h3>
            <p>${description}</p>
            <a class="btn-outline" href="${link}">${buttonText}</a>
        </div>
    `;
}

// Export for use in content-renderer.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectCard;
}
