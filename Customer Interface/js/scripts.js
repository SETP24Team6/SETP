document.addEventListener("DOMContentLoaded", function () {
    const dropdownContent = document.querySelectorAll('.dropdown-content a');
    const selectedLocation = document.getElementById('selected-location');
    const modal = document.getElementById('myModal');
    const btn = document.getElementById('start-order');
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

    function callApi(method, url, data) {
        $.ajax({
            method: method,
            url: url,
            data: data
        }).done(function( msg ) {
            window.location.reload();
        });
    }
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
            modal.style.display = 'flex';
        }
    };

    closeElements.forEach(close => {
        close.onclick = function () {
            modal.style.display = 'none';
        };
    });

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    switchToSignup.onclick = function () {
        authForm.style.display = 'none';
        signupForm.style.display = 'block';
        forgotPasswordForm.style.display = 'none';
        formTitle.style.display = 'none';
        signupTitle.style.display = 'block';
        forgotPasswordTitle.style.display = 'none';
    };

    switchToLogin.onclick = function () {
        signupForm.style.display = 'none';
        authForm.style.display = 'block';
        forgotPasswordForm.style.display = 'none';
        formTitle.style.display = 'block';
        signupTitle.style.display = 'none';
        forgotPasswordTitle.style.display = 'none';
    };

    switchToLoginFromForgot.onclick = function () {
        signupForm.style.display = 'none';
        authForm.style.display = 'block';
        forgotPasswordForm.style.display = 'none';
        formTitle.style.display = 'block';
        signupTitle.style.display = 'none';
        forgotPasswordTitle.style.display = 'none';
    };

    forgotPassword.onclick = function () {
        authForm.style.display = 'none';
        signupForm.style.display = 'none';
        forgotPasswordForm.style.display = 'block';
        formTitle.style.display = 'none';
        signupTitle.style.display = 'none';
        forgotPasswordTitle.style.display = 'block';
    };

    authForm.onsubmit = function (event) {
        event.preventDefault();
        // Add your login functionality here
        alert('Logged in successfully!');
        window.location.href = 'create-sandwich.html';
    };

    signupForm.onsubmit = function (event) {
        event.preventDefault();
        var requestPayload = {
            lastname: document.getElementById('last-name').value,
            firstname: document.getElementById('first-name').value,
            email: document.getElementById('email-signup').value,
            phone: document.getElementById('phone').value,
            birthday: document.getElementById('birthday').value,
            passwordhash: document.getElementById('password-signup').value
        };
        callApi("POST", 'http://127.0.0.1:5000/signup', {
            'data': JSON.stringify(requestPayload)
        });
        alert('Account created successfully!');
        // alert(requestPayload.lastname);
        window.location.href = 'create-sandwich.html';
    };

    forgotPasswordForm.onsubmit = function (event) {
        event.preventDefault();
        // Add your forgot password functionality here
        alert('Password reset successfully!');
        modal.style.display = 'none';
    };

    document.addEventListener('click', function (event) {
        if (!event.target.matches('.dropbtn, .dropbtn *')) {
            closeDropdown();
        }
    });
});
