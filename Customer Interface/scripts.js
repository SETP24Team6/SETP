document.addEventListener("DOMContentLoaded", function () {
    const dropdownContent = document.querySelectorAll('.dropdown-content a');
    const selectedLocation = document.getElementById('selected-location');
    const modal = document.getElementById('myModal');
    const btn = document.getElementById('start-order');
    const closeElements = document.querySelectorAll('.close, .form-close'); // Combine both close buttons
    const authForm = document.getElementById('auth-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const formTitle = document.getElementById('form-title');
    const signupTitle = document.getElementById('signup-title');

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
        formTitle.style.display = 'none';
        signupTitle.style.display = 'block';
    };

    switchToLogin.onclick = function () {
        signupForm.style.display = 'none';
        authForm.style.display = 'block';
        formTitle.style.display = 'block';
        signupTitle.style.display = 'none';
    };

    authForm.onsubmit = function (event) {
        event.preventDefault();
        // Add your login functionality here
        window.location.href = "create-sandwich.html";
    };

    signupForm.onsubmit = function (event) {
        event.preventDefault();
        // Add your sign-up functionality here
        alert('Account created successfully!');
        modal.style.display = 'none';
    };

    document.addEventListener('click', function (event) {
        if (!event.target.matches('.dropbtn, .dropbtn *')) {
            closeDropdown();
        }
    });
});
