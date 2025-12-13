/**
 * ============================================
 * CERTIFICATE CARD COMPONENT
 * ============================================
 * 
 * HOW TO ADD NEW CERTIFICATE:
 * 1. Open data/certificates.json
 * 2. Add new object with the following fields:
 *    - issuer: Issuing organization
 *    - issuedDate: Date or year issued
 *    - title: Certificate title
 *    - subtitle: Certificate description
 *    - buttonText: Button label
 *    - cardClass: "one", "two", "three", etc. (for stacking order)
 * 3. Save file - new certificate appears instantly
 * 
 * Example:
 * {
 *   "issuer": "CompTIA",
 *   "issuedDate": "2025",
 *   "title": "Security+",
 *   "subtitle": "Network Security Fundamentals",
 *   "buttonText": "View Credential",
 *   "cardClass": "four"
 * }
 * 
 * Note: cardClass determines stacking order (one, two, three, four, etc.)
 * 
 * ============================================
 */

/**
 * Renders a single certificate card
 * @param {Object} data - Certificate data
 * @param {string} data.issuer - Issuing organization
 * @param {string} data.issuedDate - Issue date
 * @param {string} data.title - Certificate title
 * @param {string} data.subtitle - Description
 * @param {string} data.buttonText - Button text
 * @param {string} data.cardClass - Card class for stacking
 * @returns {string} HTML string for certificate card
 */

function CertificateCard(data = {}) {
    const {
        issuer = '',
        issuedDate = '',
        title = 'Certificate',
        subtitle = '',
        buttonText = 'View',
        link = '#',
        cardClass = 'one'
    } = data;

    return `
        <div class="card ${cardClass}">
            <div class="cardDetails">
                <span class="cardDetailsHaeder">${issuer}</span>
                <span class="cardDetailsMeta">${issuedDate}</span>
                <a href="${link}" target="_blank" rel="noopener noreferrer" class="cardDetailsButton" style="text-decoration:none; display:inline-block; text-align:center; line-height:normal;">${buttonText}</a>
            </div>
            <div class="card-body">
                <p class="card-title">${title}</p>
                <p class="card-subtitle">${subtitle}</p>
            </div>
        </div>
    `;
}

// Export for use in content-renderer.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CertificateCard;
}
