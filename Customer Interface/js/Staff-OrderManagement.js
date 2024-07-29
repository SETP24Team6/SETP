document.addEventListener('DOMContentLoaded', () => {
    const modals = {
        newOrderModal: document.getElementById('newOrderModal'),
        preparingOrderModal: document.getElementById('preparingOrderModal'),
        readyOrderModal: document.getElementById('readyOrderModal'),
        completedOrderModal: document.getElementById('completedOrderModal')
    };

    function populateFields(){
        let populator = callApi2("GET", 'http://127.0.0.1:5000/get_all_orders', {'data': JSON.stringify("")});
        
        if(populator){
            const orders = {preparing:"", ready:"", completed:"", ordered:""}
            console.log(populator)
            $.each(populator, function(index, order) {
                orders[order.order_status] += '<tr> <td>'+order.order_id+'</td>'
                orders[order.order_status] += '<td>'
                // $.each(order.item_ingred, function(index, item) {
                //     console.log(item.index)
                //     // if(item.sandwich) {
                //     //     orders[order.order_status] += "Sandwich :"+ item.sandwich
                //     // }
                // })
                // console.log(order.item_ingred)
                for (let x in order.item_ingred) {
                    let text = order.item_ingred[x]
                    const myArray = text.split(":");
                    orders[order.order_status] += '<b><u>'+myArray[0] + '</u></b><br/>'
                    var i = 1
                    const splitter = myArray[1].split(", ")
                    for (a in splitter){
                        orders[order.order_status] += "Step " + i + ": " + splitter[a] + '<br/>'
                        i += 1 
                    }
                    orders[order.order_status] += '<br/>'
                    // for (let y in order.item_ingred[x]){
                    //     orders[order.order_status] += order.item_ingred[x][y] + '<br/>'
                    // }
                }
                
                // var keys = Object.keys(order.item_ingred);
                // keys.forEach(function(key){
                //     console.log(key, order.item_ingred[key]);
                // });
                orders[order.order_status] += '</td>'
                orders[order.order_status] += '<td>'+order.firstName+'</td>'
                orders[order.order_status] += '<td>'+order.order_timestamp.substring(5,22)+'</td>'
                orders[order.order_status] += '<td>'+order.store_name+'</td>'
                orders[order.order_status] += '<td> FREE </td>'
                orders[order.order_status] += '<td><button class="view-btn" data-status="new">View</button></td>'
            })
            for (let x in orders) {
                const filler = document.getElementById(x);
                filler.innerHTML = orders[x] 
            };
            setTimeout(populateFields, 5000)
        }
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
            case 'new':
                return document.getElementById('newOrders').querySelector('tbody');
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
