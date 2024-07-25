document.addEventListener("DOMContentLoaded", function () {
    const dropdownContent = document.querySelectorAll('.dropdown-content a');
    const selectedLocation = document.getElementById('selected-location');
    const modal = document.getElementById('myModal');
    const btn = document.getElementById('start-order');
    const pickupBtn = document.querySelector('.pickup-button');
    const closeElements = document.querySelectorAll('.close, .form-close'); // Combine both close buttons
    const authForm = document.getElementById('auth-form');
    const signupForm = document.getElementById('signup-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const switchToLoginFromForgot = document.getElementById('switch-to-login-from-forgot');
    const forgotPassword = document.getElementById('forgot-password');
    const formTitle = document.getElementById('form-title');
    const signupTitle = document.getElementById('signup-title');
    const forgotPasswordTitle = document.getElementById('forgot-password-title');

    dropdownContent.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            selectedLocation.textContent = this.dataset.location;
            closeDropdown();
        });
    });

    function closeDropdown() {
        document.querySelector('.dropdown-content').style.display = 'none';
    }

    function openDropdown() {
        document.querySelector('.dropdown-content').style.display = 'block';
    }

    selectedLocation.addEventListener('click', function () {
        openDropdown();
    });

    btn.onclick = function () {
        if (selectedLocation.textContent === 'Choose Location') {
            alert('Please select a location first.');
        } else {
            window.location.href = 'create-sandwich.html';
        }
    };

    pickupBtn.onclick = function () {
        if (selectedLocation.textContent === 'Choose Location') {
            alert('Please select a location first.');
        } else {
            window.location.href = 'crea-sandwich.html';
        }
    };

    closeElements.forEach(close => {
        close.onclick = function () {
            modal.style.display = 'none';
        };
    });

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'flex';
        }
    };

    switchToSignup.onclick = function () {
        authForm.style.display = 'none';
        signupForm.style.display = 'block';
        forgotPasswordForm.style.display = 'none';
        formTitle.style.display = 'none';
        signupTitle.style.display = 'block';
        forgotPasswordTitle.style.display = 'none';
        clearFields();
    };

    switchToLogin.onclick = function () {
        signupForm.style.display = 'none';
        authForm.style.display = 'block';
        forgotPasswordForm.style.display = 'none';
        formTitle.style.display = 'block';
        signupTitle.style.display = 'none';
        forgotPasswordTitle.style.display = 'none';
        clearFields();
    };

    switchToLoginFromForgot.onclick = function () {
        signupForm.style.display = 'none';
        authForm.style.display = 'block';
        forgotPasswordForm.style.display = 'none';
        formTitle.style.display = 'block';
        signupTitle.style.display = 'none';
        forgotPasswordTitle.style.display = 'none';
        clearFields();
    };

    forgotPassword.onclick = function () {
        authForm.style.display = 'none';
        signupForm.style.display = 'none';
        forgotPasswordForm.style.display = 'block';
        formTitle.style.display = 'none';
        signupTitle.style.display = 'none';
        forgotPasswordTitle.style.display = 'block';
        clearFields();
    };

    authForm.onsubmit = function (event) {
        event.preventDefault();
        alert('Logged in successfully!');
        document.getElementById('order-container').style.display = 'block';
        modal.style.display = 'none';
    };

    signupForm.onsubmit = function (event) {
        event.preventDefault();
        alert('Account created successfully!');
        document.getElementById('order-container').style.display = 'block';
        modal.style.display = 'none';
    };

    forgotPasswordForm.onsubmit = function (event) {
        event.preventDefault();
        const newPassword = document.getElementById('new-password').value;
        const retypePassword = document.getElementById('retype-password').value;

        if (newPassword !== retypePassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        alert('Password reset successfully!');
        modal.style.display = 'none';
    };

    function clearFields() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    }

    modal.style.display = 'flex';
});
