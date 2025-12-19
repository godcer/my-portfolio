/**
 * Contact Form Handler
 * Integration with Formspree for server-less email handling.
 * Refactored for cleanliness and maintainability.
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form-clean');
    if (!contactForm) return;

    // Configuration
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myzrbkab';

    // Elements
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Send Message';
    const gmailBtn = document.querySelector('.btn-gmail');

    // --- Event Listeners ---

    // 1. Form Submission
    contactForm.addEventListener('submit', handleFormSubmit);

    // 2. Gmail Button
    if (gmailBtn) {
        gmailBtn.addEventListener('click', handleGmailClick);
    }

    // --- Handlers ---

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (submitBtn.disabled) return; // Prevent double-submission

        // 1. Extract Data
        const formData = new FormData(e.target);
        const rawData = Object.fromEntries(formData.entries());

        // 2. Security: Client-Side Honeypot (Bot Trap)
        // If _gotcha is hidden but filled, it's a bot. Fake success to save quota.
        if (rawData._gotcha) {
            console.warn("Spam detected via honeypot. Simulating success.");
            showFeedback('Message successfully sent!', 'success');
            contactForm.reset();
            return;
        }

        // 3. Sanitization & Validation
        const name = (rawData.name || "").trim();
        const email = (rawData.email || "").trim();
        const message = (rawData.message || "").trim();

        if (!name || !email || !message) {
            showFeedback('Please fill in all fields.', 'error');
            return;
        }

        // Strict Email Check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFeedback('Please enter a valid email address.', 'error');
            return;
        }

        // 4. Submission
        setLoadingState(true);

        // meaningful payload only
        const payload = { name, email, message };

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                showFeedback('Message successfully sent!', 'success');
                contactForm.reset();
            } else {
                const resData = await response.json();
                console.error('Formspree Error Response:', resData);
                const errorMsg = resData.error || resData.errors?.map(err => err.message).join(", ") || 'Oops! Something went wrong.';
                showFeedback(errorMsg, 'error');
            }
        } catch (error) {
            console.error('Contact Form Error:', error);
            showFeedback('Network error. Please try again later.', 'error');
        } finally {
            setLoadingState(false);
        }
    }

    function handleGmailClick() {
        const name = contactForm.querySelector('input[name="name"]')?.value || "Visitor";
        const message = contactForm.querySelector('textarea[name="message"]')?.value || "Hi, I'd like to connect.";

        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Message:\r\n${message}`); // \r\n is safer for mailto/web links

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ankitssingh358@gmail.com&su=${subject}&body=${body}`;

        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    }

    // --- UI Utilities ---

    function setLoadingState(isLoading) {
        if (!submitBtn) return;

        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    }

    function showFeedback(message, type) {
        let feedbackEl = contactForm.querySelector('.form-feedback');

        // Create if doesn't exist
        if (!feedbackEl) {
            feedbackEl = document.createElement('div');
            feedbackEl.className = 'form-feedback';
            // Styling could be moved to CSS, but keeping here to avoid cross-file dependency risk during refactor
            Object.assign(feedbackEl.style, {
                marginTop: '15px',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                textAlign: 'center',
                fontWeight: '500'
            });
            contactForm.appendChild(feedbackEl);
        }

        // Apply visual state
        if (type === 'success') {
            Object.assign(feedbackEl.style, {
                color: '#00fff2',
                background: 'rgba(0, 255, 242, 0.1)',
                border: '1px solid rgba(0, 255, 242, 0.2)'
            });
        } else {
            Object.assign(feedbackEl.style, {
                color: '#ff4d4d',
                background: 'rgba(255, 77, 77, 0.1)',
                border: '1px solid rgba(255, 77, 77, 0.2)'
            });
        }

        feedbackEl.textContent = message;

        // Auto-dissolve
        setTimeout(() => feedbackEl.remove(), 5000);
    }
});
