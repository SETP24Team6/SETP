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
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartCountElement = document.querySelector('.cart-count');
    const closeCartButton = document.querySelector('.close-cart');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const addOrdersButton = document.querySelector('.add-orders-button');
    const grabButtons = document.querySelectorAll('.recommendation-item button');

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
    let waitingForSmoothie = false; // Track if we are waiting for the smoothie selection

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

    nextStepArrows.forEach((arrow) => {
        arrow.addEventListener('click', () => {
            if ((isSandwich && currentStep === 2 && selectedChoices.veggies.length !== 3) ||
                (isSandwich && currentStep === 3 && selectedChoices.sauces.length !== 2)) {
                alert('Please select the required number of items before proceeding.');
                return;
            }
            currentStep++;
            showCurrentStep();
            preselectChoices();
        });
    });

    backArrows.forEach((arrow) => {
        arrow.addEventListener('click', () => {
            currentStep--;
            showCurrentStep();
            preselectChoices();
        });
    });

    sandwichFinishIcon.addEventListener('click', () => {
        if (validateCurrentStep()) {
            addToCart(); // Add the sandwich to the cart directly
        } else {
            alert('Please make the required selections before finishing.');
        }
    });

    smoothieFinishIcon.addEventListener('click', () => {
        if (validateCurrentStep()) {
            addToCart(); // Add the smoothie to the cart directly
        } else {
            alert('Please make the required selections before finishing.');
        }
    });

    choices.forEach((choice) => {
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

    grabButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const recommendationItem = e.target.closest('.recommendation-item');
            const itemName = recommendationItem.querySelector('h3').textContent;
            const itemPrice = parseFloat(recommendationItem.querySelector('p:last-child').textContent.replace('$', ''));
            const cartItem = {
                type: itemName === 'Exclusive for you' ? 'Colour blast smoothie' : itemName,
                details: {}, // You can add more details here if necessary
                price: itemPrice
            };
            cart.push(cartItem);
            updateCartCount();
            updateCartTotal();
            renderCartItems();
            highlightCart();
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
                choices.forEach((c) => c.classList.remove('selected'));
                choice.classList.add('selected');
            } else {
                if (selectedChoices.veggies.some((v) => v.name === 'None')) {
                    selectedChoices.veggies = [];
                    choices.forEach((c) => c.classList.remove('selected'));
                }
                choice.classList.toggle('selected');
                const veggieName = choice.querySelector('h3').textContent;

                if (choice.classList.contains('selected')) {
                    if (selectedChoices.veggies.length < 3 && !selectedChoices.veggies.some((v) => v.name === veggieName)) {
                        selectedChoices.veggies.push({ name: veggieName, price });
                    } else {
                        choice.classList.remove('selected');
                        alert('You can only select up to 3 veggies.');
                    }
                } else {
                    selectedChoices.veggies = selectedChoices.veggies.filter((v) => v.name !== veggieName);
                }
            }
        } else if (stepId === 'sandwich-step-4') {
            if (choice.querySelector('h3').textContent === 'None') {
                selectedChoices.sauces = [{ name: 'None', price: 0 }];
                sandwichTotal = 6;
                choices.forEach((c) => c.classList.remove('selected'));
                choice.classList.add('selected');
            } else {
                if (selectedChoices.sauces.some((s) => s.name === 'None')) {
                    selectedChoices.sauces = [];
                    choices.forEach((c) => c.classList.remove('selected'));
                }
                choice.classList.toggle('selected');
                const sauceName = choice.querySelector('h3').textContent;

                if (choice.classList.contains('selected')) {
                    if (selectedChoices.sauces.length < 2 && !selectedChoices.sauces.some((s) => s.name === sauceName)) {
                        selectedChoices.sauces.push({ name: sauceName, price });
                    } else {
                        choice.classList.remove('selected');
                        alert('You can only select up to 2 sauces.');
                    }
                } else {
                    selectedChoices.sauces = selectedChoices.sauces.filter((s) => s.name !== sauceName);
                }
            }
        } else {
            choices.forEach((c) => c.classList.remove('selected'));
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
            choices.forEach((c) => c.classList.remove('selected'));
            choice.classList.add('selected');
            const fruitName = choice.querySelector('h3').textContent;

            selectedChoices.fruits = [{ name: fruitName, price }];
            smoothieTotal = 5 + price; // Reset smoothieTotal to base price + selected fruit price
        } else if (stepId === 'smoothie-step-2') {
            choices.forEach((c) => c.classList.remove('selected'));
            choice.classList.add('selected');

            const greenName = choice.querySelector('h3').textContent;
            smoothieTotal -= selectedChoices.greensPrice || 0;
            selectedChoices.greens = greenName;
            selectedChoices.greensPrice = price;
            smoothieTotal += price;
        } else if (stepId === 'smoothie-step-3') {
            choices.forEach((c) => c.classList.remove('selected'));
            choice.classList.add('selected');

            const proteinName = choice.querySelector('h3').textContent;
            smoothieTotal -= selectedChoices.proteinSmoothiePrice || 0;
            selectedChoices.proteinSmoothie = proteinName;
            selectedChoices.proteinSmoothiePrice = price;
            smoothieTotal += price;
        } else if (stepId === 'smoothie-step-4') {
            choices.forEach((c) => c.classList.remove('selected'));
            choice.classList.add('selected');

            const liquidBaseName = choice.querySelector('h3').textContent;
            smoothieTotal -= selectedChoices.liquidBasePrice || 0;
            selectedChoices.liquidBase = liquidBaseName;
            selectedChoices.liquidBasePrice = price;
            smoothieTotal += price;
        } else if (stepId === 'smoothie-step-5') {
            choices.forEach((c) => c.classList.remove('selected'));
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
            sandwichSteps.forEach((step) => step.classList.add('hidden'));
            smoothieSteps.forEach((step) => step.classList.add('hidden'));
            return;
        }

        if (isSandwich) {
            sandwichSteps.forEach((step, index) => {
                step.classList.toggle('hidden', index !== currentStep);
            });
            smoothieSteps.forEach((step) => step.classList.add('hidden'));
        } else {
            smoothieSteps.forEach((step, index) => {
                step.classList.toggle('hidden', index !== currentStep);
            });
            sandwichSteps.forEach((step) => step.classList.add('hidden'));
        }
        nextStepArrows.forEach((arrow) => arrow.classList.remove('hidden'));
    }

    function validateCurrentStep() {
        if (isSandwich) {
            if (currentStep === 0) return selectedChoices.bread !== '';
            if (currentStep === 1) return selectedChoices.protein !== '';
            if (currentStep === 2) {
                if (selectedChoices.veggies.length === 3 || (selectedChoices.veggies.length === 1 && selectedChoices.veggies[0].name === 'None')) {
                    return true;
                } else {
                    return false;
                }
            }
            if (currentStep === 3) {
                if (selectedChoices.sauces.length === 2 || (selectedChoices.sauces.length === 1 && selectedChoices.sauces[0].name === 'None')) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            if (currentStep === 0) return selectedChoices.fruits.length === 1;
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

        selectedChoices.veggies.forEach((v) => (calculatedSandwichTotal += v.price));
        selectedChoices.sauces.forEach((s) => (calculatedSandwichTotal += s.price));
        calculatedSandwichTotal += selectedChoices.breadPrice || 0;
        calculatedSandwichTotal += selectedChoices.proteinPrice || 0;

        selectedChoices.fruits.forEach((f) => (calculatedSmoothieTotal += f.price));
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

    function addToCart() {
        const cartItem = {
            type: isSandwich ? 'Sandwich' : 'Smoothie',
            details: { ...selectedChoices },
            price: isSandwich ? sandwichTotal : smoothieTotal
        };

        cart.push(cartItem);
        updateCartCount();
        updateCartTotal();
        renderCartItems();
        highlightCart();
        resetSelections();
    }

    function highlightCart() {
        cartDropdown.classList.add('highlight');
        setTimeout(() => {
            cartDropdown.classList.remove('highlight');
        }, 1000);
    }

    function resetSelections() {
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
        choices.forEach((choice) => choice.classList.remove('selected'));
        customizeSandwichContent.classList.add('hidden');
        currentStep = -1;
        showCurrentStep();

        // If we were waiting for the smoothie, add it to the cart now
        if (waitingForSmoothie) {
            waitingForSmoothie = false;
            addToCart();
        }
    }

    function updateCartCount() {
        cartCountElement.textContent = cart.length;
        emptyCartMessage.style.display = cart.length === 0 ? 'block' : 'none';
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <p><strong>${item.type}</strong> - $${item.price.toFixed(2)}</p>
                <div class="ingredients-container hidden">
                    ${renderItemDetails(item.details)}
                </div>
                <button class="toggle-ingredients">Show/Hide Ingredients</button>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                updateCartCount();
                updateCartTotal();
                renderCartItems();
            });
        });

        const toggleButtons = document.querySelectorAll('.toggle-ingredients');
        toggleButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const ingredientsContainer = e.target.previousElementSibling;
                ingredientsContainer.classList.toggle('hidden');
            });
        });
    }

    function renderItemDetails(details) {
        const detailItems = [];
        if (details.bread) {
            detailItems.push(`<p>Bread: ${details.bread} - $${details.breadPrice.toFixed(2)}</p>`);
        }
        if (details.protein) {
            detailItems.push(`<p>Protein: ${details.protein} - $${details.proteinPrice.toFixed(2)}</p>`);
        }
        if (details.veggies.length) {
            detailItems.push('<p>Veggies:</p>');
            details.veggies.forEach(v => {
                detailItems.push(`<p>${v.name} - $${v.price.toFixed(2)}</p>`);
            });
        }
        if (details.sauces.length) {
            detailItems.push('<p>Sauces:</p>');
            details.sauces.forEach(s => {
                detailItems.push(`<p>${s.name} - $${s.price.toFixed(2)}</p>`);
            });
        }
        if (details.fruits.length) {
            detailItems.push('<p>Fruits:</p>');
            details.fruits.forEach(f => {
                detailItems.push(`<p>${f.name} - $${f.price.toFixed(2)}</p>`);
            });
        }
        if (details.greens) {
            detailItems.push(`<p>Greens: ${details.greens} - $${details.greensPrice.toFixed(2)}</p>`);
        }
        if (details.proteinSmoothie) {
            detailItems.push(`<p>Protein: ${details.proteinSmoothie} - $${details.proteinSmoothiePrice.toFixed(2)}</p>`);
        }
        if (details.liquidBase) {
            detailItems.push(`<p>Liquid Base: ${details.liquidBase} - $${details.liquidBasePrice.toFixed(2)}</p>`);
        }
        if (details.stevia) {
            detailItems.push(`<p>Stevia: ${details.stevia} - $${details.steviaPrice.toFixed(2)}</p>`);
        }
        return detailItems.join('');
    }

    cartCountElement.parentElement.addEventListener('click', () => {
        cartDropdown.style.display = cartDropdown.style.display === 'none' || cartDropdown.style.display === '' ? 'block' : 'none';
    });

    closeCartButton.addEventListener('click', () => {
        cartDropdown.style.display = 'none';
    });

    addOrdersButton.addEventListener('click', () => {
        cartDropdown.style.display = 'none';
        window.scrollTo({
            top: document.getElementById('customise').offsetTop,
            behavior: 'smooth'
        });
    });

    // Typewriter effect for the recommendations section
    const typewriterText = document.querySelector('#recommendations h2');
    const username = getCookie('username'); // Use getCookie function to get the username
    const text = `Welcome back ${username}!`;
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

    // Function to get cookie by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Recommendations section animation
    const recommendationItems = document.querySelectorAll('.recommendation-item');
    recommendationItems.forEach((item, index) => {
        item.classList.add('animated', 'fadeInUp');
        item.style.animationDelay = `${index * 0.3}s`;
    });
});
