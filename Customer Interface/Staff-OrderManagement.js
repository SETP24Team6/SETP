document.addEventListener('DOMContentLoaded', () => {
    const modals = {
        newOrderModal: document.getElementById('newOrderModal'),
        preparingOrderModal: document.getElementById('preparingOrderModal'),
        readyOrderModal: document.getElementById('readyOrderModal'),
        completedOrderModal: document.getElementById('completedOrderModal') // Add this line
    };

    const buttons = {
        new: document.querySelectorAll('.view-btn[data-status="new"]'),
        preparing: document.querySelectorAll('.view-btn[data-status="preparing"]'),
        ready: document.querySelectorAll('.view-btn[data-status="ready"]')
    };

    const closeButtons = document.querySelectorAll('.close');

    let currentOrder = null;

    function openModal(type, orderData, ingredientsData) {
        const modalId = `${type}OrderModal`;
        const modal = modals[modalId];
        const detailsTable = document.getElementById(`${type}OrderDetailsTable`);
        const ingredientsTable = document.getElementById(`${type}OrderIngredients`);
        
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
        ingredientsBody.innerHTML = ingredientsData.map((step, index) => `
            <tr>
                <td>Step ${index + 1}</td>
                <td>${step}</td>
            </tr>
        `).join('');

        modal.style.display = 'block';
        currentOrder = orderData;
    }

    function closeModal(event) {
        const modalId = event.target.dataset.modal;
        const modal = modals[modalId];
        if (modal) {
            modal.style.display = 'none';
        }
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    Object.keys(buttons).forEach(type => {
        buttons[type].forEach(button => {
            button.addEventListener('click', () => {
                const orderData = {
                    orderNo: '000003',
                    details: 'Smoothie',
                    orderedBy: 'Stark',
                    orderedTime: '12:30:04',
                    location: 'Expo',
                    amount: '$6.00'
                };
                const ingredientsData = [
                    'Ingredient 1 details',
                    'Ingredient 2 details',
                    'Ingredient 3 details',
                    'Ingredient 4 details'
                ];
                openModal(type, orderData, ingredientsData);
            });
        });
    });

    document.getElementById('moveToPreparing')?.addEventListener('click', () => {
        moveOrderTo('preparing');
    });

    document.getElementById('moveToReady')?.addEventListener('click', () => {
        moveOrderTo('ready');
    });

    document.getElementById('moveToCompleted')?.addEventListener('click', () => {
        moveOrderTo('completed');
    });

    function moveOrderTo(nextStatus) {
        if (currentOrder) {
            const orderData = {
                ...currentOrder,
            };

            const nextModalId = `${nextStatus}OrderModal`;
            const nextModal = modals[nextModalId];
            const nextDetailsTable = document.getElementById(`${nextStatus}OrderDetailsTable`);
            const nextIngredientsTable = document.getElementById(`${nextStatus}OrderIngredients`);
            
            const nextOrderDetailsBody = nextDetailsTable.querySelector('tbody');
            nextOrderDetailsBody.innerHTML = `
                <tr>
                    <td>${orderData.orderNo}</td>
                    <td>${orderData.details}</td>
                    <td>${orderData.orderedBy}</td>
                    <td>${orderData.orderedTime}</td>
                    <td>${orderData.location}</td>
                    <td>${orderData.amount}</td>
                </tr>
            `;

            const nextIngredientsBody = nextIngredientsTable.querySelector('tbody');
            nextIngredientsBody.innerHTML = currentIngredientsData.map((step, index) => `
                <tr>
                    <td>Step ${index + 1}</td>
                    <td>${step}</td>
                </tr>
            `).join('');

            const currentModal = modals[`${currentOrder.status}OrderModal`];
            if (currentModal) {
                currentModal.style.display = 'none';
            }

            nextModal.style.display = 'block';
            currentOrder = null;
        }
    }
});