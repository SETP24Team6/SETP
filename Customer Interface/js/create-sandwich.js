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
    const datePicker = document.getElementById('takeaway-date');
    const promotionAddButtons = document.querySelectorAll('.promotion-item button');
    const cartSection = document.getElementById('cart-section');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout');
    const cartCountElement = document.querySelector('.cart-count');

    let cart = [];
    let currentStep = -1;
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
    let addSmoothie = false; // Track if the user adds a smoothie

    sandwichOption.addEventListener('click', () => {
        customizeSandwichContent.classList.remove('hidden');
        customizeTitle.textContent = 'Make Your Sandwich';
        customizeDescription.textContent = 'Freshly baked bread layered with grilled herb-spiced meat and crisp, garden-fresh vegetables.';
        arrowIcon.textContent = 'Customise Your Sandwich ($6.00)';
        isSandwich = true;
        currentStep = 0;
        showCurrentStep();
    });

    smoothieOption.addEventListener('click', () => {
        customizeSandwichContent.classList.remove('hidden');
        customizeTitle.textContent = 'Blend Your Smoothie';
        customizeDescription.textContent = 'A symphony of fresh fruits and creamy delights, healthy greens to create the perfect smoothie that wins health goals!';
        arrowIcon.textContent = 'Blend Your Smoothie ($5.00)';
        isSandwich = false;
        currentStep = 0;
        showCurrentStep();
    });

    nextStepArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            if (!validateCurrentStep()) {
                alert('Please make the required selections before proceeding.');
                return;
            }
            currentStep++;
            showCurrentStep();
            preselectChoices();
        });
    });

    backArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            currentStep--;
            showCurrentStep();
            preselectChoices();
        });
    });

    sandwichFinishIcon.addEventListener('click', () => {
        if (validateCurrentStep()) {
            showSmoothiePrompt();
        } else {
            alert('Please make the required selections before finishing.');
        }
    });

    yesAddSmoothieButton.addEventListener('click', () => {
        smoothiePromptModal.style.display = 'none';
        addSmoothie = true;
        currentStep = 0;
        isSandwich = false;
        showCurrentStep();
    });

    noAddSmoothieButton.addEventListener('click', () => {
        smoothiePromptModal.style.display = 'none';
        addSmoothie = false;
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
            if (currentStep === -1) return; // Ensure selections can only be made after clicking Customize or Blend buttons

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
            if (choice.querySelector('h3').textContent === 'None') {
                selectedChoices.veggies = [{ name: 'None', price: 0 }];
                sandwichTotal = 6;
                choices.forEach(c => c.classList.remove('selected'));
                choice.classList.add('selected');
            } else {
                if (selectedChoices.veggies.some(v => v.name === 'None')) {
                    selectedChoices.veggies = [];
                    choices.forEach(c => c.classList.remove('selected'));
                }
                choice.classList.toggle('selected');
                const veggieName = choice.querySelector('h3').textContent;

                if (choice.classList.contains('selected')) {
                    if (selectedChoices.veggies.length < 3 && !selectedChoices.veggies.some(v => v.name === veggieName)) {
                        selectedChoices.veggies.push({ name: veggieName, price });
                    } else {
                        choice.classList.remove('selected');
                        alert('You can only select up to 3 veggies.');
                    }
                } else {
                    selectedChoices.veggies = selectedChoices.veggies.filter(v => v.name !== veggieName);
                }
            }
        } else if (stepId === 'sandwich-step-4') {
            if (choice.querySelector('h3').textContent === 'None') {
                selectedChoices.sauces = [{ name: 'None', price: 0 }];
                sandwichTotal = 6;
                choices.forEach(c => c.classList.remove('selected'));
                choice.classList.add('selected');
            } else {
                if (selectedChoices.sauces.some(s => s.name === 'None')) {
                    selectedChoices.sauces = [];
                    choices.forEach(c => c.classList.remove('selected'));
                }
                choice.classList.toggle('selected');
                const sauceName = choice.querySelector('h3').textContent;

                if (choice.classList.contains('selected')) {
                    if (selectedChoices.sauces.length < 2 && !selectedChoices.sauces.some(s => s.name === sauceName)) {
                        selectedChoices.sauces.push({ name: sauceName, price });
                    } else {
                        choice.classList.remove('selected');
                        alert('You can only select up to 2 sauces.');
                    }
                } else {
                    selectedChoices.sauces = selectedChoices.sauces.filter(s => s.name !== sauceName);
                }
            }
        } else {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');

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

            const greenName = choice.querySelector('h3').textContent;
            smoothieTotal -= selectedChoices.greensPrice || 0;
            selectedChoices.greens = greenName;
            selectedChoices.greensPrice = price;
            smoothieTotal += price;
        } else if (stepId === 'smoothie-step-3') {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');

            const proteinName = choice.querySelector('h3').textContent;
            smoothieTotal -= selectedChoices.proteinSmoothiePrice || 0;
            selectedChoices.proteinSmoothie = proteinName;
            selectedChoices.proteinSmoothiePrice = price;
            smoothieTotal += price;
        } else if (stepId === 'smoothie-step-4') {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');

            const liquidBaseName = choice.querySelector('h3').textContent;
            smoothieTotal -= selectedChoices.liquidBasePrice || 0;
            selectedChoices.liquidBase = liquidBaseName;
            selectedChoices.liquidBasePrice = price;
            smoothieTotal += price;
        } else if (stepId === 'smoothie-step-5') {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');

            const steviaName = choice.querySelector('h3').textContent;
            smoothieTotal -= selectedChoices.steviaPrice || 0;
            selectedChoices.stevia = steviaName;
            selectedChoices.steviaPrice = price;
            smoothieTotal += price;
        }
    }

    function showCurrentStep() {
        if (currentStep === -1) {
            sandwichSteps.forEach(step => step.classList.add('hidden'));
            smoothieSteps.forEach(step => step.classList.add('hidden'));
            return;
        }

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
        nextStepArrows.forEach(arrow => arrow.classList.remove('hidden'));
    }

    function validateCurrentStep() {
        if (isSandwich) {
            if (currentStep === 0) return selectedChoices.bread !== '';
            if (currentStep === 1) return selectedChoices.protein !== '';
            if (currentStep === 2) {
                if ((selectedChoices.veggies.length === 3 || (selectedChoices.veggies.length === 1 && selectedChoices.veggies[0].name === 'None'))) {
                    return true;
                } else {
                    return false;
                }
            }
            if (currentStep === 3) {
                if ((selectedChoices.sauces.length === 2 || (selectedChoices.sauces.length === 1 && selectedChoices.sauces[0].name === 'None'))) {
                    return true;
                } else {
                    return false;
                }
            }
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
        let calculatedSandwichTotal = 6;
        let calculatedSmoothieTotal = 5;

        selectedChoices.veggies.forEach(v => calculatedSandwichTotal += v.price);
        selectedChoices.sauces.forEach(s => calculatedSandwichTotal += s.price);
        calculatedSandwichTotal += selectedChoices.breadPrice || 0;
        calculatedSandwichTotal += selectedChoices.proteinPrice || 0;

        selectedChoices.fruits.forEach(f => calculatedSmoothieTotal += f.price);
        calculatedSmoothieTotal += selectedChoices.greensPrice || 0;
        calculatedSmoothieTotal += selectedChoices.proteinSmoothiePrice || 0;
        calculatedSmoothieTotal += selectedChoices.liquidBasePrice || 0;
        calculatedSmoothieTotal += selectedChoices.steviaPrice || 0;

        sandwichTotal = calculatedSandwichTotal;
        smoothieTotal = calculatedSmoothieTotal;

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
                <button class="remove-sandwich">Remove Sandwich</button>
            `;
        }
        if (addSmoothie || selectedChoices.fruits.length > 0) {
            smoothieHtml += `
                <p>Choice of Fruits: ${selectedChoices.fruits.map(f => `${f.name} ${f.price > 0 ? `($${f.price.toFixed(2)})` : ''}`).join(', ')}</p>
                <p>Choice of Greens: ${selectedChoices.greens} ${selectedChoices.greensPrice > 0 ? `($${selectedChoices.greensPrice.toFixed(2)})` : ''}</p>
                <p>Choice of Protein: ${selectedChoices.proteinSmoothie} ${selectedChoices.proteinSmoothiePrice > 0 ? `($${selectedChoices.proteinSmoothiePrice.toFixed(2)})` : ''}</p>
                <p>Choice of Liquid Base: ${selectedChoices.liquidBase} ${selectedChoices.liquidBasePrice > 0 ? `($${selectedChoices.liquidBasePrice.toFixed(2)})` : ''}</p>
                <p>Stevia Level: ${selectedChoices.stevia} ${selectedChoices.steviaPrice > 0 ? `($${selectedChoices.steviaPrice.toFixed(2)})` : ''}</p>
                <button class="remove-smoothie">Remove Smoothie</button>
            `;
        }

        if (selectedChoices.bread) {
            summaryHtml += `
                <div>
                    <h3>Sandwich - $${sandwichTotal.toFixed(2)}</h3>
                    <div class="toggle-ingredients">
                        <button class="toggle-button">Show/Hide Ingredients</button>
                        <div class="ingredients hidden">${sandwichHtml}</div>
                    </div>
                </div>
            `;
        }

        if (addSmoothie || selectedChoices.fruits.length > 0) {
            summaryHtml += `
                <div>
                    <h3>Smoothie - $${smoothieTotal.toFixed(2)}</h3>
                    <div class="toggle-ingredients">
                        <button class="toggle-button">Show/Hide Ingredients</button>
                        <div class="ingredients hidden">${smoothieHtml}</div>
                    </div>
                </div>
            `;
        }

        summarySteps.innerHTML = summaryHtml;
        totalPriceElement.textContent = `Total Price: $${(sandwichTotal + (addSmoothie ? smoothieTotal : 0)).toFixed(2)}`;
        summarySection.classList.remove('hidden');

        const toggleButtons = document.querySelectorAll('.toggle-button');
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const ingredients = button.nextElementSibling;
                ingredients.classList.toggle('hidden');
            });
        });

        if (document.querySelector('.remove-sandwich')) {
            document.querySelector('.remove-sandwich').addEventListener('click', removeSandwich);
        }
        if (document.querySelector('.remove-smoothie')) {
            document.querySelector('.remove-smoothie').addEventListener('click', removeSmoothie);
        }
    }

    function scrollToSummary() {
        summarySection.scrollIntoView({ behavior: 'smooth' });
    }

    function preselectChoices() {
        choices.forEach(choice => {
            const stepId = choice.parentNode.parentNode.id;
            const choiceName = choice.querySelector('h3').textContent;

            if (stepId.includes('sandwich-step')) {
                if (
                    (stepId === 'sandwich-step-1' && choiceName === selectedChoices.bread) ||
                    (stepId === 'sandwich-step-2' && choiceName === selectedChoices.protein) ||
                    (stepId === 'sandwich-step-3' && selectedChoices.veggies.some(v => v.name === choiceName)) ||
                    (stepId === 'sandwich-step-4' && selectedChoices.sauces.some(s => s.name === choiceName))
                ) {
                    choice.classList.add('selected');
                } else {
                    choice.classList.remove('selected');
                }
            } else if (stepId.includes('smoothie-step')) {
                if (
                    (stepId === 'smoothie-step-1' && selectedChoices.fruits.some(f => f.name === choiceName)) ||
                    (stepId === 'smoothie-step-2' && choiceName === selectedChoices.greens) ||
                    (stepId === 'smoothie-step-3' && choiceName === selectedChoices.proteinSmoothie) ||
                    (stepId === 'smoothie-step-4' && choiceName === selectedChoices.liquidBase) ||
                    (stepId === 'smoothie-step-5' && choiceName === selectedChoices.stevia)
                ) {
                    choice.classList.add('selected');
                } else {
                    choice.classList.remove('selected');
                }
            }
        });
    }

    backToSelectionButton.addEventListener('click', () => {
        summarySection.classList.add('hidden');
        currentStep = -1;
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
        showCurrentStep();
        preselectChoices();
    });

    completeOrderButton.addEventListener('click', () => {
        takeawayModal.style.display = 'block';
    });

    closeTakeawayModal.addEventListener('click', () => {
        takeawayModal.style.display = 'none';
    });

    confirmTakeawayButton.addEventListener('click', () => {
        const selectedDate = document.getElementById('takeaway-date').value;
        const selectedTime = document.getElementById('takeaway-time').value;

        if (!selectedDate) {
            alert("Please select a date.");
            return;
        }

        if (!selectedTime) {
            alert("Please select a time.");
            return;
        }

        alert("Takeaway confirmed for " + selectedDate + " at " + selectedTime);
        takeawayModal.style.display = 'none';
        summarySection.classList.add('hidden');
        currentStep = -1;
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
        window.location.href = 'customer-home.html#home';
    });

    function showSmoothiePrompt() {
        if (selectedChoices.bread && selectedChoices.protein && selectedChoices.veggies.length === 3 && selectedChoices.sauces.length === 2) {
            smoothiePromptModal.style.display = 'block';
        } else {
            displaySummary();
            scrollToSummary();
        }
    }

    function removeSandwich() {
        selectedChoices.bread = '';
        selectedChoices.protein = '';
        selectedChoices.veggies = [];
        selectedChoices.sauces = [];
        sandwichTotal = 6;
        displaySummary();
    }

    function removeSmoothie() {
        selectedChoices.fruits = [];
        selectedChoices.greens = '';
        selectedChoices.proteinSmoothie = '';
        selectedChoices.liquidBase = '';
        selectedChoices.stevia = '';
        smoothieTotal = 5;
        addSmoothie = false;
        displaySummary();
    }

    // Populate time picker with 30-minute intervals from 8:00 AM to 5:00 PM
    const timePicker = document.getElementById('takeaway-time');
    for (let hour = 8; hour <= 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeOption = document.createElement('option');
            const amPm = hour < 12 ? 'AM' : 'PM';
            const displayHour = hour % 12 || 12;
            const displayMinute = minute === 0 ? '00' : minute;
            timeOption.value = `${displayHour}:${displayMinute} ${amPm}`;
            timeOption.textContent = `${displayHour}:${displayMinute} ${amPm}`;
            timePicker.appendChild(timeOption);
        }
    }

    // Allow only future dates within 2024
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const currentDay = today.getDate().toString().padStart(2, '0');
    const minDate = `${currentYear}-${currentMonth}-${currentDay}`;
    const maxDate = `${currentYear}-12-31`;

    datePicker.setAttribute('min', minDate);
    datePicker.setAttribute('max', maxDate);
    datePicker.setAttribute('placeholder', 'dd-mm-yyyy');
});
