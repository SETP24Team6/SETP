document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('orderNumber');
    const orderDetails = JSON.parse(urlParams.get('orderDetails'));
    const totalAmount = urlParams.get('totalAmount');
    const pickupTime = urlParams.get('pickupTime');

    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('order-details').innerHTML = orderDetails.map(item => `
        <div>
            <p><strong>${item.name}</strong> - $${item.price.toFixed(2)}</p>
            <button class="toggle-ingredients">Show/Hide Ingredients</button>
            <div class="ingredients hidden">
                ${item.details.join(', ')}
            </div>
        </div>
    `).join('');
    document.getElementById('total-amount').textContent = totalAmount;
    document.getElementById('pickup-time').textContent = pickupTime;

    document.querySelectorAll('.toggle-ingredients').forEach(button => {
        button.addEventListener('click', function () {
            this.nextElementSibling.classList.toggle('hidden');
        });
    });
});
