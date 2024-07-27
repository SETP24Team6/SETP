document.addEventListener('DOMContentLoaded', function () {
    const sandwichOption = document.getElementById('sandwich-option');
    const smoothieOption = document.getElementById('smoothie-option');
    const customizeSandwichContent = document.getElementById('customize-sandwich-content');
    const customizeTitle = document.getElementById('customize-title');
    const customizeDescription = document.querySelector('#customize-sandwich-content p');
    const arrowIcon = document.getElementById('arrow-icon');
    const sandwichSteps = document.querySelectorAll('.sandwich-step');
    const smoothieSteps = document.querySelectorAll('.smoothie-step');
    const nextStepArrows = document.querySelectorAll('.next-step-arrow');
    const backArrows = document.querySelectorAll('.back-arrow');
    const sandwichFinishIcon = document.getElementById('sandwich-finish-icon-4');
    const smoothieFinishIcon = document.getElementById('smoothie-finish-icon-5');
    const choices = document.querySelectorAll('.choice');
    const summarySection = document.getElementById('summary');
    const summarySteps = document.getElementById('summary-steps');
    const totalPriceElement = document.getElementById('total-price');
    const backToSelectionButton = document.getElementById('back-to-selection');
    const completeOrderButton = document.getElementById('complete-order');
    const takeawayModal = document.getElementById('takeaway-modal');
    const closeTakeawayModal = document.querySelector('.close');
    const confirmTakeawayButton = document.getElementById('confirm-takeaway');
    const smoothiePromptModal = document.getElementById('smoothie-prompt-modal');
    const yesAddSmoothieButton = document.getElementById('yes-add-smoothie');
    const noAddSmoothieButton = document.getElementById('no-add-smoothie');
    const dateButtons = document.querySelectorAll('.date-button');
    const promotionAddButtons = document.querySelectorAll('.promotion-item button');
    const cartSection = document.getElementById('cart-section');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout');
    const cartCountElement = document.querySelector('.cart-count');

    if (!cookie("userid")){
        window.location.href = 'order-now.html';
    }
    let cart = [];
    let currentStep = 0;
    let selectedChoices = {
        bread: '',
        protein: '',
        veggies: [],
        sauces: [],
        fruits: [],
        greens: '',
        proteinSmoothie: '',
        liquidBase: '',
        stevia: ''
    };

    let sandwichTotal = 6; // Base price for a sandwich
    let smoothieTotal = 5; // Base price for a smoothie

    let isSandwich = false;

    sandwichOption.addEventListener('click', () => {
        customizeSandwichContent.classList.remove('hidden');
        customizeTitle.textContent = 'Make Your Sandwich';
        customizeDescription.textContent = 'Freshly baked bread layered with grilled herb-spiced meat and crisp, garden-fresh vegetables. ';
        arrowIcon.textContent = 'Customise Your Sandwich ($6.00)';
        isSandwich = true;
        arrowIcon.classList.remove('hidden');
        currentStep = 0;
    });

    smoothieOption.addEventListener('click', () => {
        customizeSandwichContent.classList.remove('hidden');
        customizeTitle.textContent = 'Blend Your Smoothie';
        customizeDescription.textContent = 'A symphony of fresh fruits and creamy delights, healthy greens to create the perfect smoothie that wins health goals!';
        arrowIcon.textContent = 'Blend Your Smoothie ($5.00)';
        isSandwich = false;
        arrowIcon.classList.remove('hidden');
        currentStep = 0;
    });

    arrowIcon.addEventListener('click', () => {
        showCurrentStep();
        arrowIcon.classList.add('hidden');
    });

    nextStepArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            if (validateCurrentStep()) {
                currentStep++;
                showCurrentStep();
            } else {
                alert('Please make the required selections before proceeding.');
            }
        });
    });

    backArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            currentStep--;
            showCurrentStep();
        });
    });

    sandwichFinishIcon.addEventListener('click', () => {
        if (validateCurrentStep()) {
            smoothiePromptModal.style.display = 'block';
        } else {
            alert('Please make the required selections before finishing.');
        }
    });

    yesAddSmoothieButton.addEventListener('click', () => {
        smoothiePromptModal.style.display = 'none';
        currentStep = 0;
        isSandwich = false;
        showCurrentStep();
    });

    noAddSmoothieButton.addEventListener('click', () => {
        smoothiePromptModal.style.display = 'none';
        displaySummary();
        scrollToSummary();
    });

    smoothieFinishIcon.addEventListener('click', () => {
        if (validateCurrentStep()) {
            displaySummary();
            scrollToSummary();
        } else {
            alert('Please make the required selections before finishing.');
        }
    });

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const stepId = choice.parentNode.parentNode.id;
            if (stepId.includes('sandwich-step')) {
                handleSandwichChoice(choice, stepId);
            } else if (stepId.includes('smoothie-step')) {
                handleSmoothieChoice(choice, stepId);
            }
            updateTotalPrice();
        });
    });

    function getPriceFromChoice(choice) {
        const priceElement = choice.querySelector('p');
        return priceElement ? parseFloat(priceElement.textContent.replace('$', '')) : 0;
    }

    function handleSandwichChoice(choice, stepId) {
        const price = getPriceFromChoice(choice);

        if (stepId === 'sandwich-step-3') {
            choice.classList.toggle('selected');
            const selected = choice.parentNode.querySelectorAll('.selected').length;
            if (selected >= 1 && selected <= 3) {
                document.querySelector(`#sandwich-arrow-icon-${currentStep + 1}`).classList.remove('hidden');
            } else {
                document.querySelector(`#sandwich-arrow-icon-${currentStep + 1}`).classList.add('hidden');
            }

            const veggieName = choice.querySelector('h3').textContent;
            if (choice.classList.contains('selected')) {
                if (!selectedChoices.veggies.some(v => v.name === veggieName)) {
                    selectedChoices.veggies.push({ name: veggieName, price });
                    sandwichTotal += price;
                }
            } else {
                selectedChoices.veggies = selectedChoices.veggies.filter(v => v.name !== veggieName);
                sandwichTotal -= price;
            }
        } else if (stepId === 'sandwich-step-4') {
            choice.classList.toggle('selected');
            const selected = choice.parentNode.querySelectorAll('.selected').length;
            if (selected >= 1 && selected <= 2) {
                document.querySelector(`#sandwich-finish-icon-4`).classList.remove('hidden');
            } else {
                document.querySelector(`#sandwich-finish-icon-4`).classList.add('hidden');
            }

            const sauceName = choice.querySelector('h3').textContent;
            if (choice.classList.contains('selected')) {
                if (!selectedChoices.sauces.some(s => s.name === sauceName)) {
                    selectedChoices.sauces.push({ name: sauceName, price });
                    sandwichTotal += price;
                }
            } else {
                selectedChoices.sauces = selectedChoices.sauces.filter(s => s.name !== sauceName);
                sandwichTotal -= price;
            }
        } else {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            document.querySelector(`#sandwich-arrow-icon-${currentStep + 1}`).classList.remove('hidden');

            const choiceName = choice.querySelector('h3').textContent;
            if (stepId === 'sandwich-step-1') {
                sandwichTotal -= selectedChoices.breadPrice || 0;
                selectedChoices.bread = choiceName;
                selectedChoices.breadPrice = price;
                sandwichTotal += price;
            } else if (stepId === 'sandwich-step-2') {
                sandwichTotal -= selectedChoices.proteinPrice || 0;
                selectedChoices.protein = choiceName;
                selectedChoices.proteinPrice = price;
                sandwichTotal += price;
            }
        }
    }

    function handleSmoothieChoice(choice, stepId) {
        const price = getPriceFromChoice(choice);

        if (stepId === 'smoothie-step-1') {
            choice.classList.toggle('selected');
            const selected = choice.parentNode.querySelectorAll('.selected').length;
            if (selected >= 1 && selected <= 3) {
                document.querySelector(`#smoothie-arrow-icon-${currentStep + 1}`).classList.remove('hidden');
            } else {
                document.querySelector(`#smoothie-arrow-icon-${currentStep + 1}`).classList.add('hidden');
            }

            const fruitName = choice.querySelector('h3').textContent;
            if (choice.classList.contains('selected')) {
                if (!selectedChoices.fruits.some(f => f.name === fruitName)) {
                    selectedChoices.fruits.push({ name: fruitName, price });
                    smoothieTotal += price;
                }
            } else {
                selectedChoices.fruits = selectedChoices.fruits.filter(f => f.name !== fruitName);
                smoothieTotal -= price;
            }
        } else if (stepId === 'smoothie-step-2') {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            document.querySelector(`#smoothie-arrow-icon-${currentStep + 1}`).classList.remove('hidden');

            const greenName = choice.querySelector('h3').textContent;
            smoothieTotal -= selectedChoices.greensPrice || 0;
            selectedChoices.greens = greenName;
            selectedChoices.greensPrice = price;
            smoothieTotal += price;
        } else if (stepId === 'smoothie-step-3') {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            document.querySelector(`#smoothie-arrow-icon-${currentStep + 1}`).classList.remove('hidden');

            const proteinName = choice.querySelector('h3').textContent;
            smoothieTotal -= selectedChoices.proteinSmoothiePrice || 0;
            selectedChoices.proteinSmoothie = proteinName;
            selectedChoices.proteinSmoothiePrice = price;
            smoothieTotal += price;
        } else if (stepId === 'smoothie-step-4') {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            document.querySelector(`#smoothie-arrow-icon-${currentStep + 1}`).classList.remove('hidden');

            const liquidBaseName = choice.querySelector('h3').textContent;
            smoothieTotal -= selectedChoices.liquidBasePrice || 0;
            selectedChoices.liquidBase = liquidBaseName;
            selectedChoices.liquidBasePrice = price;
            smoothieTotal += price;
        } else if (stepId === 'smoothie-step-5') {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            const nextArrow = document.querySelector(`#smoothie-arrow-icon-${currentStep + 1}`);
            if (nextArrow) {
                nextArrow.classList.remove('hidden');
            }
            const finishButton = document.querySelector(`#smoothie-finish-icon-5`);
            if (finishButton) {
                finishButton.classList.remove('hidden');
            }

            const steviaName = choice.querySelector('h3').textContent;
            smoothieTotal -= selectedChoices.steviaPrice || 0;
            selectedChoices.stevia = steviaName;
            selectedChoices.steviaPrice = price;
            smoothieTotal += price;
        }
    }

    function showCurrentStep() {
        if (isSandwich) {
            sandwichSteps.forEach((step, index) => {
                step.classList.toggle('hidden', index !== currentStep);
            });
            smoothieSteps.forEach(step => step.classList.add('hidden'));
        } else {
            smoothieSteps.forEach((step, index) => {
                step.classList.toggle('hidden', index !== currentStep);
            });
            sandwichSteps.forEach(step => step.classList.add('hidden'));
        }
    }

    function validateCurrentStep() {
        if (isSandwich) {
            if (currentStep === 0) return selectedChoices.bread !== '';
            if (currentStep === 1) return selectedChoices.protein !== '';
            if (currentStep === 2) return selectedChoices.veggies.length >= 1 && selectedChoices.veggies.length <= 3;
            if (currentStep === 3) return selectedChoices.sauces.length >= 1 && selectedChoices.sauces.length <= 2;
        } else {
            if (currentStep === 0) return selectedChoices.fruits.length >= 1 && selectedChoices.fruits.length <= 3;
            if (currentStep === 1) return selectedChoices.greens !== '';
            if (currentStep === 2) return selectedChoices.proteinSmoothie !== '';
            if (currentStep === 3) return selectedChoices.liquidBase !== '';
            if (currentStep === 4) return selectedChoices.stevia !== '';
        }
        return true;
    }

    function updateTotalPrice() {
        if (isSandwich) {
            arrowIcon.textContent = `Customise Your Sandwich ($${sandwichTotal.toFixed(2)})`;
        } else {
            arrowIcon.textContent = `Blend Your Smoothie ($${smoothieTotal.toFixed(2)})`;
        }
    }

    function displaySummary() {
        let summaryHtml = '';
        let sandwichHtml = '';
        let smoothieHtml = '';

        if (selectedChoices.bread) {
            sandwichHtml += `
                <p>Choice of Bread: ${selectedChoices.bread} ${selectedChoices.breadPrice > 0 ? `($${selectedChoices.breadPrice.toFixed(2)})` : ''}</p>
                <p>Choice of Protein: ${selectedChoices.protein} ${selectedChoices.proteinPrice > 0 ? `($${selectedChoices.proteinPrice.toFixed(2)})` : ''}</p>
                <p>Base: ${selectedChoices.veggies.map(v => `${v.name} ${v.price > 0 ? `($${v.price.toFixed(2)})` : ''}`).join(', ')}</p>
                <p>Sauces: ${selectedChoices.sauces.map(s => `${s.name} ${s.price > 0 ? `($${s.price.toFixed(2)})` : ''}`).join(', ')}</p>
            `;
        }
        if (selectedChoices.fruits.length > 0) {
            smoothieHtml += `
                <p>Choice of Fruits: ${selectedChoices.fruits.map(f => `${f.name} ${f.price > 0 ? `($${f.price.toFixed(2)})` : ''}`).join(', ')}</p>
                <p>Choice of Greens: ${selectedChoices.greens} ${selectedChoices.greensPrice > 0 ? `($${selectedChoices.greensPrice.toFixed(2)})` : ''}</p>
                <p>Choice of Protein: ${selectedChoices.proteinSmoothie} ${selectedChoices.proteinSmoothiePrice > 0 ? `($${selectedChoices.proteinSmoothiePrice.toFixed(2)})` : ''}</p>
                <p>Choice of Liquid Base: ${selectedChoices.liquidBase} ${selectedChoices.liquidBasePrice > 0 ? `($${selectedChoices.liquidBasePrice.toFixed(2)})` : ''}</p>
                <p>Stevia Level: ${selectedChoices.stevia} ${selectedChoices.steviaPrice > 0 ? `($${selectedChoices.steviaPrice.toFixed(2)})` : ''}</p>
            `;
        }

        summaryHtml += `
            <div>
                <h3>Sandwich - $${sandwichTotal.toFixed(2)}</h3>
                <div class="toggle-ingredients">
                    <button class="toggle-button">Show/Hide Ingredients</button>
                    <div class="ingredients hidden">${sandwichHtml}</div>
                </div>
            </div>
        `;

        summaryHtml += `
            <div>
                <h3>Smoothie - $${smoothieTotal.toFixed(2)}</h3>
                <div class="toggle-ingredients">
                    <button class="toggle-button">Show/Hide Ingredients</button>
                    <div class="ingredients hidden">${smoothieHtml}</div>
                </div>
            </div>
        `;

        summarySteps.innerHTML = summaryHtml;
        totalPriceElement.textContent = `Total Price: $${(sandwichTotal + smoothieTotal).toFixed(2)}`;
        summarySection.classList.remove('hidden');

        const toggleButtons = document.querySelectorAll('.toggle-button');
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const ingredients = button.nextElementSibling;
                ingredients.classList.toggle('hidden');
            });
        });
    }

    function scrollToSummary() {
        summarySection.scrollIntoView({ behavior: 'smooth' });
    }

    backToSelectionButton.addEventListener('click', () => {
        summarySection.classList.add('hidden');
        currentStep = 0;
        arrowIcon.classList.remove('hidden');
        customizeSandwichContent.classList.add('hidden');
        selectedChoices = {
            bread: '',
            protein: '',
            veggies: [],
            sauces: [],
            fruits: [],
            greens: '',
            proteinSmoothie: '',
            liquidBase: '',
            stevia: ''
        };
        sandwichTotal = 6; // Reset base price for sandwich
        smoothieTotal = 5; // Reset base price for smoothie
        choices.forEach(choice => choice.classList.remove('selected'));
    });

    completeOrderButton.addEventListener('click', () => {
        takeawayModal.style.display = 'block';
    });

    closeTakeawayModal.addEventListener('click', () => {
        takeawayModal.style.display = 'none';
    });

    confirmTakeawayButton.addEventListener('click', () => {
        alert('Takeaway confirmed!');
        takeawayModal.style.display = 'none';
        summarySection.classList.add('hidden');
        currentStep = 0;
        arrowIcon.classList.remove('hidden');
        customizeSandwichContent.classList.add('hidden');
        selectedChoices = {
            bread: '',
            protein: '',
            veggies: [],
            sauces: [],
            fruits: [],
            greens: '',
            proteinSmoothie: '',
            liquidBase: '',
            stevia: ''
        };
        sandwichTotal = 6; // Reset base price for sandwich
        smoothieTotal = 5; // Reset base price for smoothie
        choices.forEach(choice => choice.classList.remove('selected'));
    });

    dateButtons.forEach(button => {
        button.addEventListener('click', () => {
            dateButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    const recommendationItems = document.querySelectorAll('.recommendation-item');

    recommendationItems.forEach((item, index) => {
        item.classList.add('animated', 'fadeInUp');
        item.style.animationDelay = `${index * 0.3}s`;
    });

    const typewriterText = document.querySelector('#recommendations h2');
    const text = typewriterText.textContent + cookie('username') + "!";
    typewriterText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();

    promotionAddButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const promotionItem = e.target.closest('.promotion-item');
            const itemName = promotionItem.querySelector('h3').textContent;
            const itemPriceText = promotionItem.querySelector('p').textContent;
            const itemPrice = parseFloat(itemPriceText.replace('$', ''));
            addToCart(itemName, itemPrice);
            alert(`${itemName} added to cart!`);
        });
    });

    function addToCart(itemName, itemPrice) {
        cart.push({ name: itemName, price: itemPrice });
        updateCartCount();
        updateCartTotal();
        renderCartItems();
        cartSection.classList.remove('hidden');
    }

    function updateCartCount() {
        cartCountElement.textContent = cart.length;
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(cartItemElement);
        });
    }

    checkoutButton.addEventListener('click', () => {
        alert('Proceeding to checkout');
        // Add checkout functionality here
    });

    // Logout button functionality
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        cookie.remove('userid')
        cookie.remove('username')
        window.location.href = 'customer-home.html#home';
    });
});
