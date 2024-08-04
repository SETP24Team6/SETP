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
    const quantityInput = document.getElementById('quantity');
    const deliveryDateInput = document.getElementById('deliveryDate');
    const supplierEmailInput = document.getElementById('supplierEmail');
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
        responseMessage.textContent = '';
    });

    sendEmailButton.addEventListener('click', () => {
        const ingredient = ingredientInput.value;
        const quantity = quantityInput.value;
        const deliveryDate = deliveryDateInput.value;
        const supplierEmail = supplierEmailInput.value;
        const message = messageInput.value;

        if (!ingredient || !quantity || !deliveryDate || !supplierEmail || !message) {
            responseMessage.style.display = 'block';
            responseMessage.className = 'show error';
            responseMessage.textContent = 'All fields must be filled out before sending the email.';
            return;
        }

        responseMessage.style.display = 'block';
        responseMessage.className = 'show success';
        responseMessage.textContent = 'Email sent successfully!';

        setTimeout(() => {
            modal.style.display = 'none';
            responseMessage.style.display = 'none';
            responseMessage.textContent = '';
            document.getElementById('restockForm').reset();
        }, 2000);
    });

const updateStockButtons = document.querySelectorAll('.update-stock-btn');
    const updateStockModal = document.getElementById('updateStockModal');
    const closeUpdateStockModal = updateStockModal.querySelector('.close');
    const confirmUpdateButton = document.getElementById('confirmUpdate');
    const updateResponseMessage = document.getElementById('updateResponseMessage');
    const updateIngredientInput = document.getElementById('updateIngredient');
    const updateQuantitySelect = document.getElementById('updateQuantity');

    updateStockButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const ingredient = row.querySelector('td').textContent;
            updateIngredientInput.value = ingredient;
            updateStockModal.style.display = 'block';
        });
    });

    closeUpdateStockModal.addEventListener('click', () => {
        updateStockModal.style.display = 'none';
        updateResponseMessage.style.display = 'none';
        updateResponseMessage.textContent = '';
    });

    confirmUpdateButton.addEventListener('click', () => {
        const ingredient = updateIngredientInput.value;
        const quantity = updateQuantitySelect.value;

        if (!ingredient || !quantity) {
            updateResponseMessage.style.display = 'block';
            updateResponseMessage.className = 'show error';
            updateResponseMessage.textContent = 'Please select a valid quantity for the update.';
            return;
        }

        // Logic to update the stock amount in the table
        const row = Array.from(document.querySelectorAll('.update-stock-btn')).find(btn => btn.closest('tr').querySelector('td').textContent === ingredient).closest('tr');
        const currentAmountCell = row.querySelector('td:nth-child(2)');
        const currentAmount = parseFloat(currentAmountCell.textContent.split(' ')[0]);
        const newAmount = currentAmount + parseFloat(quantity);

        currentAmountCell.textContent = `${newAmount} kg`;

        updateResponseMessage.style.display = 'block';
        updateResponseMessage.className = 'show success';
        updateResponseMessage.textContent = 'Stock updated successfully!';

        setTimeout(() => {
            updateStockModal.style.display = 'none';
            updateResponseMessage.style.display = 'none';
            updateResponseMessage.textContent = '';
            document.getElementById('updateStockForm').reset();
        }, 2000);
    });
});