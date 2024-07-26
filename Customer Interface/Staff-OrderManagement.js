document.addEventListener('DOMContentLoaded', () => {
    const modals = {
        newOrderModal: document.getElementById('newOrderModal'),
        preparingOrderModal: document.getElementById('preparingOrderModal'),
        readyOrderModal: document.getElementById('readyOrderModal'),
        completedOrderModal: document.getElementById('completedOrderModal')
    };

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
                    console.log("View button clicked!"); // For debug
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
                        status: status
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
            const completionTime = nextStatus === 'completed' ? `<td>${new Date().toLocaleTimeString()}</td>` : '';

            nextTable.innerHTML += `
                <tr>
                    <td>${currentOrder.orderNo}</td>
                    <td>${currentOrder.details}</td>
                    <td>${currentOrder.orderedBy}</td>
                    <td>${currentOrder.orderedTime}</td>
                    <td>${currentOrder.location}</td>
                    <td>${currentOrder.amount}</td>
                    ${completionTime}
                    <td><button class="view-btn" data-status="${nextStatus}">View</button></td>
                </tr>
            `;

            currentRow.remove();

            // Close the current modal
            const currentModalId = `${currentOrder.status}OrderModal`;
            const currentModal = modals[currentModalId];
            if (currentModal) {
                currentModal.style.display = 'none';
            }

            currentOrder.status = nextStatus;

            currentRow = null;

            // Ensure the next modal is closed until triggered
            const nextModalId = `${nextStatus}OrderModal`;
            const nextModal = modals[nextModalId];
            if (nextModal) {
                nextModal.style.display = 'none'; // Ensure it's hidden after moving
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
