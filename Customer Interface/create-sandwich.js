document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        if (anchor.getAttribute('href').startsWith("#")) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    });

    // Parallax scrolling effect
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.getAttribute('data-speed');
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });

    // IntersectionObserver for animating elements on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    const sandwichOption = document.getElementById('sandwich-option');
    const customizeSandwichContent = document.getElementById('customize-sandwich-content');
    const arrowIcon = document.getElementById('arrow-icon');
    const steps = document.querySelectorAll('.step');
    const nextStepArrows = document.querySelectorAll('.next-step-arrow');
    const backArrows = document.querySelectorAll('.back-arrow');
    const choices = document.querySelectorAll('.choice');
    const summary = document.getElementById('summary');
    const summarySteps = document.getElementById('summary-steps');
    const backToSelectionButton = document.getElementById('back-to-selection');
    const completeOrderButton = document.getElementById('complete-order');
    const takeawayModal = document.getElementById('takeaway-modal');
    const closeTakeawayModal = document.querySelector('.close');
    const confirmTakeawayButton = document.getElementById('confirm-takeaway');

    let currentStep = 0;
    let selectedChoices = [];

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
                steps[currentStep].classList.add('animated', 'fadeInUp');
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
            steps[currentStep].classList.add('animated', 'fadeInUp');
        });
    });

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            if (choice.parentNode.parentNode.id === 'step-3') {
                // Handle multiple selection for vegetables
                choice.classList.toggle('selected');
                const selected = choice.parentNode.querySelectorAll('.selected').length;
                if (selected === 3) {
                    nextStepArrows[currentStep].classList.remove('hidden');
                } else {
                    nextStepArrows[currentStep].classList.add('hidden');
                }

                // Deselect choices if more than 3 are selected
                if (selected > 3) {
                    choice.classList.remove('selected');
                }
            } else if (choice.parentNode.parentNode.id === 'step-4') {
                // Handle multiple selection for sauces
                choice.classList.toggle('selected');
                const selected = choice.parentNode.querySelectorAll('.selected').length;
                if (selected === 2) {
                    nextStepArrows[currentStep].classList.remove('hidden');
                } else {
                    nextStepArrows[currentStep].classList.add('hidden');
                }

                // Deselect choices if more than 2 are selected
                if (selected > 2) {
                    choice.classList.remove('selected');
                }
            } else {
                // Handle single selection for steps 1 and 2
                choices.forEach(c => c.classList.remove('selected'));
                choice.classList.add('selected');
                nextStepArrows[currentStep].classList.remove('hidden');
                setTimeout(() => {
                    steps[currentStep].classList.add('hidden');
                    currentStep++;
                    if (currentStep < steps.length) {
                        steps[currentStep].classList.remove('hidden');
                        steps[currentStep].classList.add('animated', 'fadeInUp');
                    }
                }, 1000);
            }

            const stepTitle = steps[currentStep].querySelector('h2').textContent;
            const choiceName = choice.querySelector('h3').textContent;

            const existingChoice = selectedChoices.find(c => c.step === stepTitle);
            if (existingChoice) {
                existingChoice.choice = choiceName;
            } else {
                selectedChoices.push({ step: stepTitle, choice: choiceName });
            }
        });
    });

    backToSelectionButton.addEventListener('click', () => {
        summary.classList.add('hidden');
        steps.forEach(step => step.classList.add('hidden'));
        currentStep = 0;
        steps[currentStep].classList.remove('hidden');
    });

    completeOrderButton.addEventListener('click', () => {
        takeawayModal.style.display = 'block';
    });

    closeTakeawayModal.addEventListener('click', () => {
        takeawayModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == takeawayModal) {
            takeawayModal.style.display = 'none';
        }
    });

    confirmTakeawayButton.addEventListener('click', () => {
        takeawayModal.style.display = 'none';
        alert('Takeaway confirmed!');
    });

    function displaySummary() {
        summarySteps.innerHTML = '';
        const bread = selectedChoices.find(c => c.step === 'Step 1: Pick Your Bread').choice;
        const protein = selectedChoices.find(c => c.step === 'Step 2: Pick Your Protein').choice;
        const veggies = Array.from(document.querySelectorAll('#step-3 .selected')).map(v => v.querySelector('h3').textContent).join(', ');
        const sauces = Array.from(document.querySelectorAll('#step-4 .selected')).map(s => s.querySelector('h3').textContent).join(', ');

        summarySteps.innerHTML += `<p>Choice of Bread: ${bread}</p>`;
        summarySteps.innerHTML += `<p>Choice of Protein: ${protein}</p>`;
        summarySteps.innerHTML += `<p>Base: ${veggies}</p>`;
        summarySteps.innerHTML += `<p>Sauces: ${sauces}</p>`;

        summary.classList.remove('hidden');
    }
});

