/**
 * ============================================
 * CONTENT RENDERER - MAIN ORCHESTRATOR
 * ============================================
 * 
 * This file loads all JSON data and renders the portfolio
 * sections using component functions.
 * 
 * DEVELOPER GUIDE:
 * 
 * To update content:
 * 1. Edit the appropriate JSON file in /data/
 * 2. Reload the page - changes appear instantly
 * 
 * To add new sections:
 * 1. Create new JSON file in /data/
 * 2. Create new component in /components/
 * 3. Add rendering logic below
 * 4. Update index.html with target container
 * 
 * ============================================
 */

/**
 * Load JSON data from a file
 * @param {string} path - Path to JSON file
 * @returns {Promise<Object>} Parsed JSON data
 */
async function loadJSON(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load ${path}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${path}:`, error);
        return null;
    }
}

/**
 * Main portfolio rendering function
 * Loads all data and renders all sections
 */
async function renderPortfolio() {
    console.log('🚀 Starting portfolio content rendering...');

    try {
        // Load all JSON data in parallel
        const [aboutData, experienceData, skillsData, certificatesData, educationData, projectsData] = await Promise.all([
            loadJSON('/data/about.json'),
            loadJSON('/data/experience.json'),
            loadJSON('/data/skills.json'),
            loadJSON('/data/certificates.json'),
            loadJSON('/data/education.json'),
            loadJSON('/data/projects.json')
        ]);

        console.log('✅ All data loaded successfully');

        // ========================================
        // RENDER ABOUT SECTION
        // ========================================
        if (aboutData) {
            const aboutContent = AboutPanel(aboutData);
            const aboutTextContainer = document.querySelector('#about .about-text');
            if (aboutTextContainer) {
                aboutTextContainer.innerHTML = aboutContent.text;
                console.log('✅ About section rendered');
            }
        }

        // ========================================
        // RENDER EXPERIENCE SECTION
        // ========================================
        if (experienceData && Array.isArray(experienceData)) {
            const experienceHTML = experienceData.map(exp => ExperienceCard(exp)).join('');
            const experienceContainer = document.querySelector('.experience-cards');
            if (experienceContainer) {
                experienceContainer.innerHTML = experienceHTML;
                console.log(`✅ Experience section rendered (${experienceData.length} cards)`);
            }
        }

        // ========================================
        // RENDER SKILLS SECTION
        // ========================================
        if (skillsData && Array.isArray(skillsData)) {
            const skillsHTML = skillsData.map(skill => SkillOrb(skill)).join('');
            const skillsContainer = document.querySelector('.skills-galaxy');
            if (skillsContainer) {
                skillsContainer.innerHTML = skillsHTML;
                console.log(`✅ Skills section rendered (${skillsData.length} orbs)`);
            }
        }

        // ========================================
        // RENDER CERTIFICATES SECTION
        // ========================================
        if (certificatesData && Array.isArray(certificatesData)) {
            const certificatesHTML = certificatesData.map(cert => CertificateCard(cert)).join('');
            const certificatesContainer = document.querySelector('.cert-stack');
            if (certificatesContainer) {
                certificatesContainer.innerHTML = certificatesHTML;
                console.log(`✅ Certificates section rendered (${certificatesData.length} cards)`);
            }
        }

        // ========================================
        // RENDER EDUCATION SECTION
        // ========================================
        if (educationData && Array.isArray(educationData)) {
            const educationHTML = educationData.map(edu => EducationPillar(edu)).join('');
            const educationContainer = document.querySelector('.edu-list');
            if (educationContainer) {
                educationContainer.innerHTML = educationHTML;
                console.log(`✅ Education section rendered (${educationData.length} items)`);
            }
        }

        // ========================================
        // RENDER PROJECTS SECTION
        // ========================================
        if (projectsData && Array.isArray(projectsData)) {
            const projectsHTML = projectsData.map(project => ProjectCard(project)).join('');
            const projectsContainer = document.querySelector('.projects-grid');
            if (projectsContainer) {
                projectsContainer.innerHTML = projectsHTML;
                console.log(`✅ Projects section rendered (${projectsData.length} cards)`);

                // Re-initialize 3D tilt effect for project cards
                // The project-tilt.js script will automatically pick up new cards
                // We just need to trigger a re-initialization
                reinitializeEffects();
            }
        }

        console.log('🎉 Portfolio rendering complete!');

    } catch (error) {
        console.error('❌ Error rendering portfolio:', error);
    }
}

/**
 * Re-initialize interactive effects after content is rendered
 * This ensures effects like 3D tilt work on dynamically added content
 */
function reinitializeEffects() {
    // The project-tilt.js script runs on page load
    // We need to manually trigger it again for new cards

    // Dispatch a custom event that project-tilt.js can listen for
    const event = new CustomEvent('contentRendered', {
        detail: { timestamp: Date.now() }
    });
    document.dispatchEvent(event);

    console.log('🔄 Effects re-initialized');
}

/**
 * Initialize the portfolio when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPortfolio);
} else {
    // DOM already loaded
    renderPortfolio();
}

/**
 * Export for testing/debugging
 */
if (typeof window !== 'undefined') {
    window.renderPortfolio = renderPortfolio;
    window.loadJSON = loadJSON;
}
