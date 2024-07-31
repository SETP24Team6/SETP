document.addEventListener('click', function (event) {
    var dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(function (dropdown) {
        var dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (!dropdown.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});

document.querySelectorAll('.dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
        event.preventDefault();
        var dropdownMenu = this.nextElementSibling;
        var isVisible = dropdownMenu.style.display === 'block';
        document.querySelectorAll('.dropdown-menu').forEach(function (menu) {
            menu.style.display = 'none';
        });
        if (!isVisible) {
            dropdownMenu.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const restockButtons = document.querySelectorAll('.restock-btn');
    const modal = document.getElementById('restockModal');
    const closeModal = document.querySelector('.close');
    const sendEmailButton = document.getElementById('sendEmail');
    const responseMessage = document.getElementById('responseMessage');
    const ingredientInput = document.getElementById('ingredient');
    const messageInput = document.getElementById('message');

    restockButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const ingredient = row.querySelector('td').textContent;
            ingredientInput.value = ingredient;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        responseMessage.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            responseMessage.style.display = 'none';
        }
    });

    sendEmailButton.addEventListener('click', () => {
        // Fake email sending response
        responseMessage.style.display = 'block';
        responseMessage.className = 'show error'; // Show error response
        responseMessage.textContent = 'Failed to send email. Please try again later.';
        
        // Hide the modal after showing the response message
        setTimeout(() => {
            modal.style.display = 'none';
        }, 2000);
    });
});
