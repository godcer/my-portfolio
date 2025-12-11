document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form-clean');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');

            const name = nameInput.value;
            const email = emailInput.value; // Not used in mailto body usually, but good to capture if sending to backend
            const message = messageInput.value;

            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

            // Open default mail client
            window.location.href = `mailto:your-email@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

            // Optional: clear form
            contactForm.reset();
        });

        // Gmail specific button
        const gmailBtn = document.querySelector('.btn-gmail');
        if (gmailBtn) {
            gmailBtn.addEventListener('click', () => {
                const nameInput = contactForm.querySelector('input[type="text"]');
                const messageInput = contactForm.querySelector('textarea');

                const name = nameInput.value || "Visitor";
                const message = messageInput.value || "Hi, I'd like to connect.";

                const subject = `Portfolio Contact from ${name}`;
                const body = `Message:%0D%0A${message}`;

                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=your-email@gmail.com&su=${encodeURIComponent(subject)}&body=${body}`;
                window.open(gmailUrl, '_blank');
            });
        }
    }
});
