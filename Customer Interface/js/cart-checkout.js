document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('orderNumber');
    const orderDetails = urlParams.get('orderDetails');
    const totalAmount = urlParams.get('totalAmount');
    const pickupTime = urlParams.get('pickupTime');

    // Debugging logs
    console.log('Order Number:', orderNumber);
    console.log('Order Details:', orderDetails);
    console.log('Total Amount:', totalAmount);
    console.log('Pickup Time:', pickupTime);

    // Check if orderDetails is valid JSON
    let orderDetailsParsed;
    try {
        orderDetailsParsed = JSON.parse(orderDetails);
    } catch (e) {
        console.error('Failed to parse orderDetails:', e);
        return;
    }

    // Debugging log for parsed order details
    console.log('Parsed Order Details:', orderDetailsParsed);
    console.log('userid:', cookie('userid'));

    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('order-details').innerHTML = orderDetailsParsed.map(item => {
        const isSandwich = item.type === 'sandwich';
        const details = isSandwich ? `
            Bread: ${item.details.bread}<br>
            Protein: ${item.details.protein}<br>
            Sauce: ${item.details.sauces.join(', ')}<br>
            Vegetable: ${item.details.veggies.join(', ')}
        ` : `
            Fruits: ${item.details.fruits.join(', ')}<br>
            Greens: ${item.details.greens}<br>
            Protein: ${item.details.proteinSmoothie}<br>
            Liquid Base: ${item.details.liquidBase}<br>
            Stevia: ${item.details.stevia}
        `;

        return `
            <div class="order-item">
                <p><strong>${item.name}</strong> - $${item.price.toFixed(2)}</p>
                <div class="ingredients hidden">
                    ${details}
                </div>
                <button class="toggle-ingredients">Show/Hide Ingredients</button>
            </div>
        `;
    }).join('');
    document.getElementById('total-amount').textContent = totalAmount;
    document.getElementById('pickup-time').textContent = pickupTime;

    // Calculate and display points earned
    const pointsEarned = Math.floor(parseFloat(totalAmount));
    document.querySelector('.order-details').innerHTML += `<p>Points Earned: ${pointsEarned} points</p>`;

    document.querySelectorAll('.toggle-ingredients').forEach(button => {
        button.addEventListener('click', function () {
            this.previousElementSibling.classList.toggle('hidden');
        });
    });
});
