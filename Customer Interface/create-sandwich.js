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
    const finishStepArrow = document.getElementById('smoothie-finish-icon-5');
    const choices = document.querySelectorAll('.choice');
    const summarySection = document.getElementById('summary');
    const summarySteps = document.getElementById('summary-steps');
    const backToSelectionButton = document.getElementById('back-to-selection');
    const completeOrderButton = document.getElementById('complete-order');
    const takeawayModal = document.getElementById('takeaway-modal');
    const closeTakeawayModal = document.querySelector('.close');
    const confirmTakeawayButton = document.getElementById('confirm-takeaway');
    const smoothiePromptModal = document.getElementById('smoothie-prompt-modal');
    const yesAddSmoothieButton = document.getElementById('yes-add-smoothie');
    const noAddSmoothieButton = document.getElementById('no-add-smoothie');

    let currentStep = 0;
    let selectedChoices = {
        bread: '',
        protein: '',
        veggies: [],
        sauces: [],
        fruits: [],
        greens: [],
        proteins: [],
        liquidBase: [],
        stevia: ''
    };

    let isSandwich = false;

    sandwichOption.addEventListener('click', () => {
        customizeSandwichContent.classList.remove('hidden');
        customizeTitle.textContent = 'Make Your Sandwich';
        customizeDescription.textContent = 'Freshly baked bread layered with grilled herb-spiced meat and crisp, garden-fresh vegetables. Select your preferred sauces and toppings to create an exceptionally tasty sandwich.';
        arrowIcon.textContent = 'Customise Your Sandwich';
        isSandwich = true;
        arrowIcon.classList.remove('hidden');
        currentStep = 0;
    });

    smoothieOption.addEventListener('click', () => {
        customizeSandwichContent.classList.remove('hidden');
        customizeTitle.textContent = 'Blend Your Smoothie';
        customizeDescription.textContent = 'A Symphony of Fresh Fruits and Creamy Delights. Choose from our variety of vibrant fruits, healthy greens, and delicious add-ins to create the perfect smoothie that suits your taste and health goals!';
        arrowIcon.textContent = 'Blend Your Smoothie';
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
            if (isSandwich && currentStep === 3) {
                smoothiePromptModal.style.display = 'block';
            } else {
                currentStep++;
                showCurrentStep();
            }
        });
    });

    backArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            currentStep--;
            showCurrentStep();
        });
    });

    finishStepArrow.addEventListener('click', () => {
        displaySummary();
        // Scroll to summary section
        summarySection.scrollIntoView({ behavior: 'smooth' });
    });

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const stepId = choice.parentNode.parentNode.id;
            if (stepId.includes('sandwich-step')) {
                handleSandwichChoice(choice, stepId);
            } else if (stepId.includes('smoothie-step')) {
                handleSmoothieChoice(choice, stepId);
            }
        });
    });

    function handleSandwichChoice(choice, stepId) {
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
                if (!selectedChoices.veggies.includes(veggieName)) {
                    selectedChoices.veggies.push(veggieName);
                }
            } else {
                selectedChoices.veggies = selectedChoices.veggies.filter(v => v !== veggieName);
            }
        } else if (stepId === 'sandwich-step-4') {
            choice.classList.toggle('selected');
            const selected = choice.parentNode.querySelectorAll('.selected').length;
            if (selected >= 1 && selected <= 2) {
                document.querySelector(`#sandwich-arrow-icon-${currentStep + 1}`).classList.remove('hidden');
            } else {
                document.querySelector(`#sandwich-arrow-icon-${currentStep + 1}`).classList.add('hidden');
            }

            const sauceName = choice.querySelector('h3').textContent;
            if (choice.classList.contains('selected')) {
                if (!selectedChoices.sauces.includes(sauceName)) {
                    selectedChoices.sauces.push(sauceName);
                }
            } else {
                selectedChoices.sauces = selectedChoices.sauces.filter(s => s !== sauceName);
            }
        } else {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            document.querySelector(`#sandwich-arrow-icon-${currentStep + 1}`).classList.remove('hidden');

            const choiceName = choice.querySelector('h3').textContent;
            if (stepId === 'sandwich-step-1') {
                selectedChoices.bread = choiceName;
            } else if (stepId === 'sandwich-step-2') {
                selectedChoices.protein = choiceName;
            }
        }
    }

    function handleSmoothieChoice(choice, stepId) {
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
                if (!selectedChoices.fruits.includes(fruitName)) {
                    selectedChoices.fruits.push(fruitName);
                }
            } else {
                selectedChoices.fruits = selectedChoices.fruits.filter(f => f !== fruitName);
            }
        } else if (stepId === 'smoothie-step-2') {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            document.querySelector(`#smoothie-arrow-icon-${currentStep + 1}`).classList.remove('hidden');

            const greenName = choice.querySelector('h3').textContent;
            selectedChoices.greens = [greenName];
        } else if (stepId === 'smoothie-step-3') {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            document.querySelector(`#smoothie-arrow-icon-${currentStep + 1}`).classList.remove('hidden');

            const proteinName = choice.querySelector('h3').textContent;
            selectedChoices.proteins = [proteinName];
        } else if (stepId === 'smoothie-step-4') {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            document.querySelector(`#smoothie-arrow-icon-${currentStep + 1}`).classList.remove('hidden');

            const liquidBaseName = choice.querySelector('h3').textContent;
            selectedChoices.liquidBase = [liquidBaseName];
        } else if (stepId === 'smoothie-step-5') {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            document.querySelector(`#smoothie-arrow-icon-${currentStep + 1}`).classList.remove('hidden');

            const steviaName = choice.querySelector('h3').textContent;
            selectedChoices.stevia = steviaName;
            console.log("Stevia selected:", selectedChoices.stevia);  // Debugging statement
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

    function displaySummary() {
        let summaryHtml = '';
        if (selectedChoices.bread) {
            summaryHtml += `
                <p>Choice of Bread: ${selectedChoices.bread}</p>
                <p>Choice of Protein: ${selectedChoices.protein}</p>
                <p>Base: ${selectedChoices.veggies.join(', ')}</p>
                <p>Sauces: ${selectedChoices.sauces.join(', ')}</p>
            `;
        }
        if (selectedChoices.fruits.length > 0) {
            summaryHtml += `
                <p>Choice of Fruits: ${selectedChoices.fruits.join(', ')}</p>
                <p>Choice of Greens: ${selectedChoices.greens.join(', ')}</p>
                <p>Choice of Protein: ${selectedChoices.proteins.join(', ')}</p>
                <p>Choice of Liquid Base: ${selectedChoices.liquidBase.join(', ')}</p>
                <p>Stevia Level: ${selectedChoices.stevia}</p>
            `;
        }
        summarySteps.innerHTML = summaryHtml;
        summarySection.classList.remove('hidden');
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
            greens: [],
            proteins: [],
            liquidBase: [],
            stevia: ''
        };
        choices.forEach(choice => choice.classList.remove('selected'));
    });

    completeOrderButton.addEventListener('click', () => {
        takeawayModal.classList.remove('hidden');
    });

    closeTakeawayModal.addEventListener('click', () => {
        takeawayModal.classList.add('hidden');
    });

    confirmTakeawayButton.addEventListener('click', () => {
        alert('Takeaway confirmed!');
        takeawayModal.classList.add('hidden');
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
            greens: [],
            proteins: [],
            liquidBase: [],
            stevia: ''
        };
        choices.forEach(choice => choice.classList.remove('selected'));
    });

    const recommendationItems = document.querySelectorAll('.recommendation-item');

    recommendationItems.forEach((item, index) => {
        item.classList.add('animated', 'fadeInUp');
        item.style.animationDelay = `${index * 0.3}s`;
    });

    const typewriterText = document.querySelector('#recommendations h2');
    const text = typewriterText.textContent;
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

    yesAddSmoothieButton.addEventListener('click', () => {
        smoothiePromptModal.style.display = 'none';
        currentStep = 0;
        isSandwich = false;
        showCurrentStep();
    });

    noAddSmoothieButton.addEventListener('click', () => {
        smoothiePromptModal.style.display = 'none';
        displaySummary();
    });
});
