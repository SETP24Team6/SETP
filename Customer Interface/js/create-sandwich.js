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
    const rewardsSelect = document.getElementById('rewards');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const rewardsDeductionElement = document.querySelector('.rewards-deduction');
    const availablePointsElement = document.getElementById('available-points');

    let cartTotal = 0;

    // Ensure "Next Step" buttons are positioned correctly
    nextStepArrows.forEach((arrow) => {
        const parent = arrow.closest('.sandwich-step') || arrow.closest('.smoothie-step');
        const navigationButtons = parent.querySelector('.navigation-buttons');
        navigationButtons.appendChild(arrow);
    });

    // fields populator (done)
    let populator = callApi2("GET", 'http://127.0.0.1:5000/getProducts', { 'data': JSON.stringify("") });
    if (populator) {
        const products = { bread: "", protein: "", vegetable: "", sauce: "", fruit: "", yogurt: "", smoothievegetable: "", liquidbase: "" }
        $.each(populator, function (index, product) {
            let dict_key = product.product_type_name.toLowerCase().replace(" ", "")
            products[dict_key] += '<div class="choice" data-choice="' + product.products_id
            products[dict_key] += '" data-price="' + product.price_point + '">'
            products[dict_key] += '<img src="' + product.image_path + '" alt="' + product.product_name + '">'
            products[dict_key] += '<h3>' + product.product_name + '</h3>';
            if (product.price_point > 0.0) {
                products[dict_key] += '<p>$' + product.price_point + '0</p></div>';
            } else {
                products[dict_key] += '</div>';
            }
        })
        for (let x in products) {
            const filler = document.getElementById(x);
            filler.innerHTML = products[x]
        };
    }

    const choices = document.querySelectorAll('.choice');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCountElement = document.querySelector('.cart-count');
    const closeCartButton = document.querySelector('.close-cart');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const addOrdersButton = document.querySelector('.add-orders-button');
    const grabButtons = document.querySelectorAll('.grab-now');
    const addButtons = document.querySelectorAll('.add-to-cart');
    const cartCheckOut = document.getElementById('checkout');

    
    // cookie checker (done)
    if (!cookie("userid")) {
        window.location.href = 'order-now.html';
    }

    let cart = {};
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

    let selectedChoices2 = new Set();
    
    cartLoader()

    let sandwichTotal = 6; // Base price for a sandwich
    let smoothieTotal = 5; // Base price for a smoothie
    let isSandwich = false;
    let isSpecial = false;
    let specialHolder = new Object();

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
        });
    });

    backArrows.forEach((arrow) => {
        arrow.addEventListener('click', () => {
            currentStep--;
            showCurrentStep();
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
        isSpecial = true
        button.addEventListener('click', (e) => {
            const recommendationItem = e.target.closest('.recommendation-item');
            const itemName = recommendationItem.getAttribute('data-name');
            const itemPrice = parseFloat(recommendationItem.getAttribute('data-price'));
            specialHolder.name = itemName
            specialHolder.price = itemPrice
            switch(itemName){
                case "Sandwich munches" :
                    selectedChoices2 = new Set(["4","6","10","12","13","16","18"]);
                    break;
                case "Blend Berry" :
                    selectedChoices2 = new Set(["20","28"]);
                    break;
                case "Colour Blast" :
                    selectedChoices2 = new Set(["20","21","22","23","25","29"]);
                    break;
            }
            console.log(selectedChoices2)
            addToCart();
            highlightCart();
            // console.log('Added to cart:', cartItem); // Debugging log
        });
    });

    addButtons.forEach((button) => {
        isSpecial = true
        button.addEventListener('click', (e) => {
            const promotionItem = e.target.closest('.promotion-item');
            const itemName = promotionItem.getAttribute('data-name');
            const itemPrice = parseFloat(promotionItem.getAttribute('data-price'));
            specialHolder.name = itemName
            specialHolder.price = itemPrice
            switch(itemName){
                case "Salmon Sensation" :
                    selectedChoices2 = new Set(["2","8","10","9","13","15","17"]);
                    break;
                case "Summer Berry" :
                    selectedChoices2 = new Set(["22","21","27","28"]);
                    break;
            }
            console.log(selectedChoices2)
            addToCart();
            highlightCart();
        });
    });

    function handleSandwichChoice(choice, stepId) {
        const price = parseFloat(choice.getAttribute('data-price'));

        if (stepId === 'sandwich-step-3') {
            choice.classList.toggle('selected');
            const veggieName = choice.getAttribute('data-choice');

            if (choice.classList.contains('selected')) {
                if (selectedChoices.veggies.length < 3 && !selectedChoices.veggies.some((v) => v.name === veggieName)) {
                    selectedChoices.veggies.push({ name: veggieName, price });
                    selectedChoices2.add(veggieName)
                } else {
                    choice.classList.remove('selected');
                    alert('You can only select up to 3 veggies.');
                }
            } else {
                selectedChoices.veggies = selectedChoices.veggies.filter((v) => v.name !== veggieName);
                selectedChoices2.delete(veggieName)
            }
        } else if (stepId === 'sandwich-step-4') {
            if (selectedChoices.sauces.some((s) => s.name === 'None')) {
                selectedChoices.sauces = [];
                choices.forEach((c) => c.classList.remove('selected'));
            }
            choice.classList.toggle('selected');
            const sauceName = choice.getAttribute('data-choice');

            if (choice.classList.contains('selected')) {
                if (selectedChoices.sauces.length < 2 && !selectedChoices.sauces.some((s) => s.name === sauceName)) {
                    selectedChoices.sauces.push({ name: sauceName, price });
                    selectedChoices2.add(sauceName)
                } else {
                    choice.classList.remove('selected');
                    alert('You can only select up to 2 sauces.');
                }
            } else {
                selectedChoices.sauces = selectedChoices.sauces.filter((s) => s.name !== sauceName);
                selectedChoices2.delete(sauceName);
            }
        } else {
            choices.forEach((c) => c.classList.remove('selected'));
            choices.forEach((c) => selectedChoices2.delete(c.getAttribute('data-choice')));
            choice.classList.add('selected');

            const choiceName = choice.getAttribute('data-choice');
            
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
        
        console.log(selectedChoices2)

    }

    function handleSmoothieChoice(choice, stepId) {
        const price = parseFloat(choice.getAttribute('data-price'));
        const choiceName = choice.getAttribute('data-choice');

        if (stepId === 'smoothie-step-1') {
            choices.forEach((c) => c.classList.remove('selected'));
            choice.classList.add('selected');

            selectedChoices.fruits = [{ name: choiceName, price }];
            smoothieTotal = 5 + price; // Reset smoothieTotal to base price + selected fruit price
        } else if (stepId === 'smoothie-step-2') {
            choices.forEach((c) => c.classList.remove('selected'));
            choice.classList.add('selected');

            smoothieTotal -= selectedChoices.greensPrice || 0;
            selectedChoices.greens = choiceName;
            selectedChoices.greensPrice = price;
            smoothieTotal += price;
        } else if (stepId === 'smoothie-step-3') {
            choices.forEach((c) => c.classList.remove('selected'));
            choice.classList.add('selected');

            smoothieTotal -= selectedChoices.proteinSmoothiePrice || 0;
            selectedChoices.proteinSmoothie = choiceName;
            selectedChoices.proteinSmoothiePrice = price;
            smoothieTotal += price;
        } else if (stepId === 'smoothie-step-4') {
            choices.forEach((c) => c.classList.remove('selected'));
            choice.classList.add('selected');

            smoothieTotal -= selectedChoices.liquidBasePrice || 0;
            selectedChoices.liquidBase = choiceName;
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
        var requestPayload = new Object();
        if(isSpecial){
            requestPayload = {
                type: '3',
                name: specialHolder.name,
                price: specialHolder.price,
                ingredents: [...selectedChoices2],
                member: cookie('userid')
            };
        }else{
            if (isSandwich){
                selectedChoices2.add(selectedChoices.bread)
                selectedChoices2.add(selectedChoices.protein)
            }else{
                selectedChoices2.add(selectedChoices.fruits[0].name)
                selectedChoices2.add(selectedChoices.greens)
                selectedChoices2.add(selectedChoices.proteinSmoothie)
                selectedChoices2.add(selectedChoices.liquidBase)
            }
            requestPayload = {
                type: isSandwich ? '1' : '2',
                name: isSandwich ? 'Sandwich' : 'Smoothie',
                price: isSandwich ? sandwichTotal : smoothieTotal,
                ingredents: [...selectedChoices2],
                member: cookie('userid')
            };
        }
        console.log(requestPayload)
        callApi2("POST", 'http://127.0.0.1:5000/add_order',
            { 'data': JSON.stringify(requestPayload) });

        cartLoader();

        highlightCart();
        resetSelections();
    }

    function cartLoader() {
        let cart_item_loader = ''
        let cart_price = 0.0
        let cart_loader = callApi2("POST", 'http://127.0.0.1:5000/get_order',
            { 'data': JSON.stringify(cookie('userid')) });

        if (cart_loader.length != 0) {
            // Updates cart amount and visibility of empty cart message
            cart_amount = Object.keys(cart_loader[0]['order_ingred']).length
            cartCountElement.textContent = cart_amount;
            emptyCartMessage.style.display = cart_amount === 0 ? 'block' : 'none';
            $.each(cart_loader, function (index, order) {
                for (let z in order.order_ingred) {
                    for (let y in order.order_ingred[z]) {
                        cart_price += parseFloat(order.order_ingred[z][y].price)
                        cart_item_loader += '<div class="cart-item">'
                        cart_item_loader += '<p><strong>' + y + '</strong> $' + order.order_ingred[z][y].price + '</p>'
                        cart_item_loader += '<div class="ingredients-container hidden"><p>'
                        for (let x in order.order_ingred[z][y]) {
                            if (x != 'price') {
                                cart_item_loader += x + ': ' + order.order_ingred[z][y][x] + '<br/>'
                            }
                        }
                        cart_item_loader += '</p></div>'
                        cart_item_loader += '<button class="toggle-ingredients">Show/Hide Ingredients</button>'
                        cart_item_loader += '<button class="remove-item" data-index=' + z + '>Remove</button> </div>'
                    }
                }
            })
            cartItemsContainer.innerHTML = cart_item_loader
            const toggleButtons = document.querySelectorAll('.toggle-ingredients');
            toggleButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    const ingredientsContainer = e.target.previousElementSibling;
                    ingredientsContainer.classList.toggle('hidden');
                });
            });

            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    const index = e.target.getAttribute('data-index');
                    callApi2("POST", 'http://127.0.0.1:5000/delete_item',
                        { 'data': JSON.stringify(index) });
                    cartLoader()
                });
            });

        }else{
            cartItemsContainer.innerHTML = cart_item_loader
            cartCountElement.textContent = 0;
            emptyCartMessage.style.display = 'block';

        }
        cartTotal = cart_price;
        cartTotalPrice.textContent = `$${cart_price.toFixed(2)}`;
        selectedChoices2 = new Set();
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
    }

    rewardsSelect.addEventListener('change', function () {
        let deduction = 0;
        const selectedValue = rewardsSelect.value;
        if (selectedValue === '10') {
            deduction = 0.5;
        } else if (selectedValue === '20') {
            deduction = 1.0;
        } else if (selectedValue === '30') {
            deduction = 1.5;
        }
        const totalPrice = cartTotal - deduction;
        cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
        rewardsDeductionElement.textContent = `-$${deduction.toFixed(2)} redeemed`;
    });

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

    cartCheckOut.addEventListener('click', () => {
        callApi2("POST", 'http://127.0.0.1:5000/cart_out', 
            {'data': JSON.stringify(cookie('userid'))});
        cartLoader()
        window.location.href = 'cart-checkout.html';
    });

    // Typewriter effect for the recommendations section
    const typewriterText = document.querySelector('#recommendations h2');
    const username = cookie('username'); // Use getCookie function to get the username
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

    // Recommendations section animation
    const recommendationItems = document.querySelectorAll('.recommendation-item');
    recommendationItems.forEach((item, index) => {
        item.classList.add('animated', 'fadeInUp');
        item.style.animationDelay = `${index * 0.3}s`;
    });

    // Display available points
    availablePointsElement.textContent = "Available Points: 47";

    function clearCart() {
        // Clear the cart in the frontend
        cart = [];
        cartCountElement.textContent = 0;
        cartItemsContainer.innerHTML = '';
        cartTotalPrice.textContent = '$0.00';
        emptyCartMessage.style.display = 'block';

        // Clear the cart in the backend
        callApi2("POST", 'http://127.0.0.1:5000/clear_cart', { 'data': JSON.stringify({ member: cookie('userid') }) });
    }
});
