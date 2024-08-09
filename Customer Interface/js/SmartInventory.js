if (cookie("type") == 'member') {
    window.location.href = 'create-sandwich.html';
}

console.log(cookie('userid)'))
console.log(cookie('username)'))
console.log(cookie('type)'))

loader = callApi2("GET", 'http://127.0.0.1:5000/getInventory', 
    { 'data': JSON.stringify("") });


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
    const logout = document.getElementById('logout-btn');
    
    logout.addEventListener('click', () => {
        cookie.remove("userid")
        cookie.remove("username")
        cookie.remove("employeeBool")
        window.location.href = 'order-now.html';
    });
    const sandwichIngred = document.getElementById('sandwichIngredients');
    const smoothieIngred = document.getElementById('smoothieIngredients');
    preamble = `
        <thead>
            <tr>
                <th>Ingredient</th>
                <th>Current Amount/Stock</th>
                <th>Optimal Stock Level</th>
                <th>Status</th>
                <th>Action</th>
                <th>Update Stock</th>
            </tr>
        </thead>
        <tbody>
    `
    sandwichLoader = ""
    smoothieLoader = ""
    for (let i = 0; i < 30; i++) {
        if (i < 19){
            currentInv = loader[i]["quantity_amount"]/1000
            optInv = loader[i]["amount"]*loader[i]["uom"]/1000 
            sandwichLoader += "<tr>"
            sandwichLoader += "<td>"+loader[i]["product_name"] + "</td>"
            sandwichLoader += "<td>"+currentInv + "KG</td>"
            sandwichLoader += "<td>"+optInv + "KG</td>" 
            if (currentInv / optInv < 0.2){
                sandwichLoader += "<td class='status critically-low'>Critically Low</td>"
            }else if (currentInv / optInv < 0.4){
                sandwichLoader += "<td class='status low'>Low</td>"
            }else if (currentInv / optInv < 0.7){
                sandwichLoader += "<td class='status moderate'>Moderate</td>"
            }else {
                sandwichLoader += "<td class='status high'>High</td>"
            }
            sandwichLoader += "<td><button class='restock-btn'>Restock</button></td>" 
            sandwichLoader += "<td><button class='update-stock-btn'>Update Stock</button></td>" 
            sandwichLoader += "</tr>"
        }else{
            currentInv = loader[i]["quantity_amount"]/1000
            optInv = loader[i]["amount"]*loader[i]["uom"]/1000 
            smoothieLoader += "<tr>"
            smoothieLoader += "<td>"+loader[i]["product_name"] + "</td>"
            smoothieLoader += "<td>"+currentInv + "KG</td>"
            smoothieLoader += "<td>"+optInv + "KG</td>" 
            if (currentInv / optInv < 0.2){
                smoothieLoader += "<td class='status critically-low'>Critically Low</td>"
            }else if (currentInv / optInv < 0.4){
                smoothieLoader += "<td class='status low'>Low</td>"
            }else if (currentInv / optInv < 0.7){
                smoothieLoader += "<td class='status moderate'>Moderate</td>"
            }else {
                smoothieLoader += "<td class='status high'>High</td>"
            }
            smoothieLoader += "<td><button class='restock-btn'>Restock</button></td>" 
            smoothieLoader += "<td><button class='update-stock-btn'>Update Stock</button></td>" 
            smoothieLoader += "</tr>"
        }
        
    }
    sandwichIngred.innerHTML = preamble+sandwichLoader+"</tbody>"
    smoothieIngred.innerHTML = preamble+smoothieLoader+"</tbody>"

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

        callApi2("POST", 'http://127.0.0.1:5000/update_stock', 
            { 'data': JSON.stringify({ingredient: ingredient, quantity: quantity}) });
        
        updateResponseMessage.style.display = 'block';
        updateResponseMessage.className = 'show success';
        updateResponseMessage.textContent = 'Stock updated successfully!';

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    });
});