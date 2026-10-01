// Set the hidden timestamp field when the page loads
document.querySelector('#timestamp').value = new Date().toISOString();

// Modal open/close logic
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modalCloseButtons = document.querySelectorAll('.modal-close');

modalTriggers.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        document.querySelector(`#${modalId}`).classList.add('show');
    });
});

modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal-overlay').classList.remove('show');
    });
});

// Also close modal if clicking outside the modal content (on the overlay itself)
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('show');
        }
    });
});