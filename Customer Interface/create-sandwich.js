document.addEventListener('DOMContentLoaded', function () {
    const sandwichOption = document.getElementById('sandwich-option');
    const customizeSandwichContent = document.getElementById('customize-sandwich-content');
    const arrowIcon = document.getElementById('arrow-icon');
    const steps = document.querySelectorAll('.step');
    const nextStepArrows = document.querySelectorAll('.next-step-arrow');
    const backArrows = document.querySelectorAll('.back-arrow');
    const choices = document.querySelectorAll('.choice');
    const summarySection = document.getElementById('summary');
    const summarySteps = document.getElementById('summary-steps');
    const backToSelectionButton = document.getElementById('back-to-selection');
    const completeOrderButton = document.getElementById('complete-order');
    const takeawayModal = document.getElementById('takeaway-modal');
    const closeTakeawayModal = document.getElementById('close-takeaway-modal');
    const confirmTakeawayButton = document.getElementById('confirm-takeaway');

    let currentStep = 0;
    let selectedChoices = {
        bread: '',
        protein: '',
        veggies: [],
        sauces: []
    };

    sandwichOption.addEventListener('click', () => {
        customizeSandwichContent.classList.remove('hidden');
    });

    arrowIcon.addEventListener('click', () => {
        steps[currentStep].classList.remove('hidden');
        arrowIcon.classList.add('hidden');
    });

    nextStepArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            steps[currentStep].classList.add('hidden');
            currentStep++;
            if (currentStep < steps.length) {
                steps[currentStep].classList.remove('hidden');
            } else {
                displaySummary();
            }
        });
    });

    backArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            steps[currentStep].classList.add('hidden');
            currentStep--;
            steps[currentStep].classList.remove('hidden');
        });
    });

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const stepId = choice.parentNode.parentNode.id;
            if (stepId === 'step-3') {
                // Handle multiple selection for vegetables
                choice.classList.toggle('selected');
                const selected = choice.parentNode.querySelectorAll('.selected').length;
                if (selected >= 1 && selected <= 3) {
                    nextStepArrows[currentStep].classList.remove('hidden');
                } else {
                    nextStepArrows[currentStep].classList.add('hidden');
                }

                // Update selected choices
                const veggieName = choice.querySelector('h3').textContent;
                if (choice.classList.contains('selected')) {
                    if (!selectedChoices.veggies.includes(veggieName)) {
                        selectedChoices.veggies.push(veggieName);
                    }
                } else {
                    selectedChoices.veggies = selectedChoices.veggies.filter(v => v !== veggieName);
                }
            } else if (stepId === 'step-4') {
                // Handle multiple selection for sauces
                choice.classList.toggle('selected');
                const selected = choice.parentNode.querySelectorAll('.selected').length;
                if (selected >= 1 && selected <= 2) {
                    nextStepArrows[currentStep].classList.remove('hidden');
                } else {
                    nextStepArrows[currentStep].classList.add('hidden');
                }

                // Update selected choices
                const sauceName = choice.querySelector('h3').textContent;
                if (choice.classList.contains('selected')) {
                    if (!selectedChoices.sauces.includes(sauceName)) {
                        selectedChoices.sauces.push(sauceName);
                    }
                } else {
                    selectedChoices.sauces = selectedChoices.sauces.filter(s => s !== sauceName);
                }
            } else {
                // Handle single selection for steps 1 and 2
                choices.forEach(c => c.classList.remove('selected'));
                choice.classList.add('selected');
                nextStepArrows[currentStep].classList.remove('hidden');

                // Update selected choices
                const choiceName = choice.querySelector('h3').textContent;
                if (stepId === 'step-1') {
                    selectedChoices.bread = choiceName;
                } else if (stepId === 'step-2') {
                    selectedChoices.protein = choiceName;
                }

                setTimeout(() => {
                    steps[currentStep].classList.add('hidden');
                    currentStep++;
                    if (currentStep < steps.length) {
                        steps[currentStep].classList.remove('hidden');
                    } else {
                        displaySummary();
                    }
                }, 1000);
            }
        });
    });

    function displaySummary() {
        let summaryHtml = `
            <p>Choice of Bread: ${selectedChoices.bread}</p>
            <p>Choice of Protein: ${selectedChoices.protein}</p>
            <p>Base: ${selectedChoices.veggies.join(', ')}</p>
            <p>Sauces: ${selectedChoices.sauces.join(', ')}</p>
        `;
        summarySteps.innerHTML = summaryHtml;
        summarySection.classList.remove('hidden');
    }

    backToSelectionButton.addEventListener('click', () => {
        summarySection.classList.add('hidden');
        currentStep = 0;
        steps.forEach(step => step.classList.add('hidden'));
        arrowIcon.classList.remove('hidden');
        customizeSandwichContent.classList.add('hidden');
        selectedChoices = {
            bread: '',
            protein: '',
            veggies: [],
            sauces: []
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
        // Resetting everything
        summarySection.classList.add('hidden');
        currentStep = 0;
        steps.forEach(step => step.classList.add('hidden'));
        arrowIcon.classList.remove('hidden');
        customizeSandwichContent.classList.add('hidden');
        selectedChoices = {
            bread: '',
            protein: '',
            veggies: [],
            sauces: []
        };
        choices.forEach(choice => choice.classList.remove('selected'));
    });
});
