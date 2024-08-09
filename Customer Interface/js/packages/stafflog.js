document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const signupForm = document.getElementById('signup-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const switchToForgetPassword = document.getElementById('switch-to-forgot-password');
    const switchToLoginFromForgot = document.getElementById('switch-to-signup-from-forgot');
    const forgotPassword = document.getElementById('forgot-password');
    const signupTitle = document.getElementById('signup-title');
    const forgotPasswordTitle = document.getElementById('forgot-password-title');

    // Function to toggle form visibility
    function toggleForms(showSignup, showForgotPassword) {
        signupForm.style.display = showSignup ? 'block' : 'none';
        forgotPasswordForm.style.display = showForgotPassword ? 'block' : 'none';
        signupTitle.style.display = showSignup ? 'block' : 'none';
        forgotPasswordTitle.style.display = showForgotPassword ? 'block' : 'none';
        clearFields();
    }

    // Set up event listeners
    if (switchToForgetPassword) {
        switchToForgetPassword.addEventListener('click', function () {
            console.log("Forgot Password button clicked");
            toggleForms(false, true);
        });
    }

    if (switchToLoginFromForgot) {
        switchToLoginFromForgot.addEventListener('click', function () {
            toggleForms(true, false);
        });
    }

    if (forgotPassword) {
        forgotPassword.addEventListener('click', function () {
            console.log("Forgot Password clicked");
            toggleForms(false, true);
        });
    }

    // Clear form fields
    function clearFields() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    }
});
