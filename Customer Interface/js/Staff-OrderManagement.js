if (cookie("type") == 'member') {
    window.location.href = 'create-sandwich.html';
}


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

// document.addEventListener('DOMContentLoaded', function() {
//     const preparingOrdersTableBody = document.getElementById('preparing');
//     const readyOrdersTableBody = document.getElementById('ready');
//     const completedOrdersTableBody = document.getElementById('completed');

//     function checkIfTableIsEmpty(tableBody, message) {
//         if (tableBody && tableBody.children.length === 0) {
//             console.log(`Table Body ID: ${tableBody.id} is empty, adding message.`);
//             const row = document.createElement('tr');
//             const cell = document.createElement('td');
//             cell.colSpan = 7; // Adjust this number according to the number of columns in the table
//             cell.textContent = message;
//             cell.style.textAlign = 'center';
//             row.appendChild(cell);
//             tableBody.appendChild(row);
//         } else {
//             console.log(`Table Body ID: ${tableBody.id} is not empty or does not exist.`);
//         }
//     }

//     checkIfTableIsEmpty(preparingOrdersTableBody, "There are currently no new orders to process.");
//     checkIfTableIsEmpty(readyOrdersTableBody, "There are currently no ready orders for pickup.");
//     checkIfTableIsEmpty(completedOrdersTableBody, "There are currently no completed orders.");
// });


function updateTable(id, data) {
    const tableBody = document.getElementById(id);
    let messageRow = tableBody.querySelector('.no-data-message');
    
    if (!messageRow) {
        messageRow = document.createElement('tr');
        messageRow.classList.add('no-data-message');
        const cell = document.createElement('td');
        cell.colSpan = 7; // Adjust this number as needed
        cell.style.textAlign = 'center';
        messageRow.appendChild(cell);
        tableBody.appendChild(messageRow);
    }
    
    // Clear existing rows
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    if (data.length === 0) {
        messageRow.querySelector('td').textContent = 'There are currently no data available.';
        messageRow.style.display = 'table-row';
    } else {
        data.forEach(item => {
            const row = document.createElement('tr');
            // Add cells and content to row
            tableBody.appendChild(row);
        });
        messageRow.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const logout = document.getElementById('logout-btn');
    const preparingOrdersTableBody = document.getElementById('preparing');
    const readyOrdersTableBody = document.getElementById('ready');
    const completedOrdersTableBody = document.getElementById('completed');

    function checkIfTableIsEmpty(tableBody, message) {
        if (tableBody && tableBody.children.length === 0) {
            console.log(`Table Body ID: ${tableBody.id} is empty, adding message.`);
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 7; // Adjust this number according to the number of columns in the table
            cell.textContent = message;
            cell.style.textAlign = 'center';
            row.appendChild(cell);
            tableBody.appendChild(row);
        } else {
            console.log(`Table Body ID: ${tableBody.id} is not empty or does not exist.`);
        }
    }


    logout.addEventListener('click', () => {
        cookie.remove("userid")
        cookie.remove("username")
        cookie.remove("employeeBool")
        window.location.href = 'order-now.html';
    });

    const modals = {
        newOrderModal: document.getElementById('newOrderModal'),
        preparingOrderModal: document.getElementById('preparingOrderModal'),
        readyOrderModal: document.getElementById('readyOrderModal'),
        completedOrderModal: document.getElementById('completedOrderModal')
    };

    function populateFields(){
        let populator = callApi2("GET", 'http://127.0.0.1:5000/get_all_orders', {'data': JSON.stringify("")});
        if(populator){
            const orders = {preparing:"", ready:"", completed:""}
            $.each(populator, function(index, order) {
                orders[order.order_status] += '<tr> <td class="order_id" >'+order.order_id+'</td>'
                orders[order.order_status] += '<td>'
                for (let z in order.order_ingred) {
                    for (let y in order.order_ingred[z]){
                        orders[order.order_status] += '<b><u>'+ y + '</u></b><br/>'
                        for (let x in order.order_ingred[z][y]){
                            orders[order.order_status] += x + ': ' +order.order_ingred[z][y][x] + '<br/>'
                        }
                    orders[order.order_status] += '<br/>'
                    }
                }
                orders[order.order_status] += '</td>'
                orders[order.order_status] += '<td>'+order.firstName+'</td>'
                orders[order.order_status] += '<td>'+order.order_timestamp.substring(5,22)+'</td>'
                orders[order.order_status] += '<td>'+order.store_name+'</td>'
                orders[order.order_status] += '<td> $'+parseFloat(order.order_price).toFixed(2)+' </td>'
                switch(order.order_status) {
                    case 'preparing':
                        orders[order.order_status] += '<td><button class="ready">Ready!</button></td>'
                        break;
                    case 'ready':
                        orders[order.order_status] += '<td><button class="complete">Complete!</button></td>'
                        break;
                    case 'completed':
                        orders[order.order_status] += '<td><button class="Done">Done!</button></td>'
                    break;
                      default:
                        // code block
                    }
                
            })
            for (let x in orders) {
                const filler = document.getElementById(x);
                filler.innerHTML = orders[x] 
                
            };
            
            checkIfTableIsEmpty(preparingOrdersTableBody, "There are currently no new orders to process.");
            checkIfTableIsEmpty(readyOrdersTableBody, "There are currently no ready orders for pickup.");
            checkIfTableIsEmpty(completedOrdersTableBody, "There are currently no completed orders.");
            setTimeout(populateFields, 60000)
        }else{
            
        }
        $(".ready").click(function () {
            var $row = $(this).closest("tr");
            var $Area = $row.find(".order_id").text();
            console.log($Area)
            callApi("POST", 'http://127.0.0.1:5000/ready_order', {'data': JSON.stringify($Area)});
            
         });
         $(".complete").click(function () {
            var $row = $(this).closest("tr");
            var $Area = $row.find(".order_id").text();
            callApi("POST", 'http://127.0.0.1:5000/complete_order', {'data': JSON.stringify($Area)});
            
         });
    
    }
    populateFields()

    
    const closeButtons = document.querySelectorAll('.close');

    let currentOrder = null;
    let currentRow = null;

    function openModal(type, orderData, row) {
        const modalId = `${type}OrderModal`;
        const modal = modals[modalId];
        const detailsTable = document.getElementById(`${type}OrderDetailsTable`);
        const ingredientsTable = document.getElementById(`${type}OrderIngredients`);

        detailsTable.querySelector('tbody').innerHTML = '';
        ingredientsTable.querySelector('tbody').innerHTML = '';

        const orderDetailsBody = detailsTable.querySelector('tbody');
        orderDetailsBody.innerHTML = `
            <tr>
                <td>${orderData.orderNo}</td>
                <td>${orderData.details}</td>
                <td>${orderData.orderedBy}</td>
                <td>${orderData.orderedTime}</td>
                <td>${orderData.location}</td>
                <td>${orderData.amount}</td>
                ${type === 'completed' ? `<td>${orderData.completionTime || 'N/A'}</td>` : ''}
            </tr>
        `;

        const ingredientsBody = ingredientsTable.querySelector('tbody');
        ingredientsBody.innerHTML = orderData.ingredients.map((step, index) => `
            <tr>
                <td>Step ${index + 1}</td>
                <td>${step}</td>
            </tr>
        `).join('');

        modal.style.display = 'block';
        currentOrder = orderData;
        currentRow = row;
    }

    function closeModal(event) {
        const modalId = event.target.dataset.modal;
        const modal = modals[modalId];
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function attachEventDelegation() {
        document.querySelectorAll('table').forEach(table => {
            table.addEventListener('click', event => {
                if (event.target.classList.contains('view-btn')) {
                    const button = event.target;
                    const status = button.dataset.status;
                    const orderData = {
                        orderNo: button.closest('tr').cells[0].textContent,
                        details: button.closest('tr').cells[1].textContent,
                        orderedBy: button.closest('tr').cells[2].textContent,
                        orderedTime: button.closest('tr').cells[3].textContent,
                        location: button.closest('tr').cells[4].textContent,
                        amount: button.closest('tr').cells[5].textContent,
                        ingredients: ['Ingredient 1 details', 'Ingredient 2 details', 'Ingredient 3 details', 'Ingredient 4 details'],
                        status: status,
                        // Include completionTime here if status is 'completed'
                        completionTime: status === 'completed' ? button.closest('tr').cells[6].textContent : ''
                    };
                    openModal(status, orderData, button.closest('tr'));
                }
            });
        });
    }

    function getTableForStatus(status) {
        switch (status) {
            case 'preparing':
                return document.getElementById('preparingOrders').querySelector('tbody');
            case 'ready':
                return document.getElementById('readyOrders').querySelector('tbody');
            case 'completed':
                return document.getElementById('completedOrders').querySelector('tbody');
            default:
                return null;
        }
    }

    function moveOrderTo(nextStatus) {
        if (currentOrder && currentRow) {
            const nextTable = getTableForStatus(nextStatus);
            const completionTime = nextStatus === 'completed' ? new Date().toLocaleTimeString() : '';

            // Append the new row with completionTime if available
            nextTable.innerHTML += `
                <tr>
                    <td>${currentOrder.orderNo}</td>
                    <td>${currentOrder.details}</td>
                    <td>${currentOrder.orderedBy}</td>
                    <td>${currentOrder.orderedTime}</td>
                    <td>${currentOrder.location}</td>
                    <td>${currentOrder.amount}</td>
                    ${nextStatus === 'completed' ? `<td>${completionTime}</td>` : ''}
                    <td><button class="view-btn" data-status="${nextStatus}">View</button></td>
                </tr>
            `;

            // Remove the current row
            currentRow.remove();

            // Close the current modal
            const currentModalId = `${currentOrder.status}OrderModal`;
            const currentModal = modals[currentModalId];
            if (currentModal) {
                currentModal.style.display = 'none';
            }

            // Update currentOrder and clear currentRow
            currentOrder.status = nextStatus;
            currentOrder.completionTime = nextStatus === 'completed' ? completionTime : ''; // Update completion time
            currentRow = null;

            // Ensure the next modal is hidden until triggered
            const nextModalId = `${nextStatus}OrderModal`;
            const nextModal = modals[nextModalId];
            if (nextModal) {
                nextModal.style.display = 'none';
            }

            attachEventDelegation();
        }
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    document.getElementById('newOrderButton')?.addEventListener('click', () => {
        moveOrderTo('preparing');
    });

    document.getElementById('preparingOrderButton')?.addEventListener('click', () => {
        moveOrderTo('ready');
    });

    document.getElementById('readyOrderButton')?.addEventListener('click', () => {
        moveOrderTo('completed');
    });

    document.getElementById('completedOrderButton')?.addEventListener('click', () => {
        // Optional: Handle actions if any after order is completed
    });

    attachEventDelegation();
});

