/**
 * Contact Form Handler
 * Integration with Formspree for efficient, server-less email handling.
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form-clean');
    const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Send Message';

    // Replace with your specific Formspree Endpoint
    // Example: https://formspree.io/f/xyzaqwer
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myzrbkab';

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Basic Validation
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (!name || !email || !message) {
                showFeedback('Please fill in all fields.', 'error');
                return;
            }

            // 2. UI: Sending State
            setLoadingState(true);

            // 3. Send Data to Formspree
            try {
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    showFeedback('Message successfully sent!', 'success');
                    contactForm.reset();
                } else {
                    // Formspree Validation Error
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        const errorMsg = data.errors.map(err => err.message).join(", ");
                        showFeedback(errorMsg, 'error');
                    } else {
                        showFeedback('Oops! Something went wrong.', 'error');
                    }
                }
            } catch (error) {
                // Network Error
                showFeedback('Network error. Please try again later.', 'error');
                console.error('Contact Form Error:', error);
            } finally {
                // Restore Button State
                setLoadingState(false);
            }
        });

        // Gmail specific button (Preserved functional logic)
        const gmailBtn = document.querySelector('.btn-gmail');
        if (gmailBtn) {
            gmailBtn.addEventListener('click', () => {
                const nameInput = contactForm.querySelector('input[name="name"]');
                const messageInput = contactForm.querySelector('textarea[name="message"]');

                const name = (nameInput && nameInput.value) || "Visitor";
                const message = (messageInput && messageInput.value) || "Hi, I'd like to connect.";

                const subject = `Portfolio Contact from ${name}`;
                const body = `Message:%0D%0A${message}`;

                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ankitssingh358@gmail.com&su=${encodeURIComponent(subject)}&body=${body}`;
                window.open(gmailUrl, '_blank');
            });
        }
    }

    // --- Helper Functions ---

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
        // Create or reuse feedback element
        let feedbackEl = contactForm.querySelector('.form-feedback');

        if (!feedbackEl) {
            feedbackEl = document.createElement('div');
            feedbackEl.className = 'form-feedback';
            feedbackEl.style.marginTop = '15px';
            feedbackEl.style.padding = '10px';
            feedbackEl.style.borderRadius = '8px';
            feedbackEl.style.fontSize = '0.9rem';
            feedbackEl.style.textAlign = 'center';
            feedbackEl.style.fontWeight = '500';
            contactForm.appendChild(feedbackEl);
        }

        // Style based on type
        if (type === 'success') {
            feedbackEl.style.color = '#00fff2';
            feedbackEl.style.background = 'rgba(0, 255, 242, 0.1)';
            feedbackEl.style.border = '1px solid rgba(0, 255, 242, 0.2)';
        } else {
            feedbackEl.style.color = '#ff4d4d'; // Red error
            feedbackEl.style.background = 'rgba(255, 77, 77, 0.1)';
            feedbackEl.style.border = '1px solid rgba(255, 77, 77, 0.2)';
        }

        feedbackEl.textContent = message;

        // Auto-hide after 5 seconds
        setTimeout(() => {
            feedbackEl.remove();
        }, 5000);
    }
});
