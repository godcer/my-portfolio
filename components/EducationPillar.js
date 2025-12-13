/**
 * ============================================
 * EDUCATION PILLAR COMPONENT
 * ============================================
 * 
 * HOW TO ADD NEW EDUCATION:
 * 1. Open data/education.json
 * 2. Add new object with the following fields:
 *    - degree: Degree or qualification name
 *    - institution: School/university and year
 *    - description: Brief description
 *    - coverText: Text for book cover (use <br> for line breaks)
 * 3. Save file - new education entry appears instantly
 * 
 * Example:
 * {
 *   "degree": "M.Sc Cybersecurity",
 *   "institution": "University of ABC — 2026",
 *   "description": "Advanced threat hunting, malware reverse engineering.",
 *   "coverText": "Master's<br>Degree"
 * }
 * 
 * ============================================
 */

/**
 * Renders a single education book/pillar
 * @param {Object} data - Education data
 * @param {string} data.degree - Degree name
 * @param {string} data.institution - Institution and year
 * @param {string} data.description - Description
 * @param {string} data.coverText - Cover text (HTML allowed)
 * @returns {string} HTML string for education book
 */
function EducationPillar(data = {}) {
    const {
        degree = 'Degree',
        institution = '',
        description = '',
        coverText = 'Education',
        link = null
    } = data;

    // Create a linked or non-linked title
    const titleHtml = link
        ? `<a href="${link}" target="_blank" rel="noopener noreferrer" style="color:inherit; text-decoration:none; border-bottom: 1px dotted rgba(255,255,255,0.5);"><h3>${degree}</h3></a>`
        : `<h3>${degree}</h3>`;

    return `
        <div class="edu-book book">
            <div class="edu-inner">
                ${titleHtml}
                <p class="edu-org">${institution}</p>
                <p>${description}</p>
            </div>
            <div class="edu-cover cover">
                <p>${coverText}</p>
            </div>
        </div>
    `;
}

// Export for use in content-renderer.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EducationPillar;
}
