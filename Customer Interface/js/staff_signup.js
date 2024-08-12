document.addEventListener("DOMContentLoaded", function () {


    // Get elements
    const signupForm = document.getElementById('signup-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const switchToForgotPassword = document.getElementById('switch-to-forgot-password');
    const switchToSignupFromForgot = document.getElementById('switch-to-signup-from-forgot');
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
    if (switchToForgotPassword) {
        switchToForgotPassword.addEventListener('click', function () {
            console.log("Forgot Password button clicked");
            toggleForms(false, true);
        });
    }

    if (switchToSignupFromForgot) {
        switchToSignupFromForgot.addEventListener('click', function () {
            console.log("Switch to Signup from Forgot Password clicked");
            toggleForms(true, false);
        });
    }


    // Handle signup form submission
    signupForm.onsubmit = function (event) {
        event.preventDefault();
        var requestUser = {
            email: document.getElementById('email-signup').value,
            phone: document.getElementById('phone').value
        }
        
        let checker = callApi2("POST", 'http://127.0.0.1:5000/staff_checkuser',
            {'data': JSON.stringify(requestUser)});
        
        if (!checker.exists){
            hash = hex_md5(document.getElementById('password-signup').value);
            var requestPayload = {
                lastname: document.getElementById('last-name').value,
                firstname: document.getElementById('first-name').value,
                email: document.getElementById('email-signup').value,
                phone: document.getElementById('phone').value,
                birthday: document.getElementById('birthday').value,
                passwordhash: hash
            };
            callApi("POST", 'http://127.0.0.1:5000/staff_signup',
                {'data': JSON.stringify(requestPayload)});
            
            alert('Account created successfully!');
         
                window.location.href = 'staff-signin.html';
         
        } else {
            alert('Phone or Email already exist!');
        }
    };

    // Handle forgot password form submission
    forgotPasswordForm.onsubmit = function (event) {
        event.preventDefault();
        hash = hex_md5(document.getElementById('new-password').value);
        rehash = hex_md5(document.getElementById('re-password').value);
            var requestPayload = {
                email: document.getElementById('email-forgot').value,
                birthday: document.getElementById('birthday-forgot').value,
                passwordhash: hash
            };
        if(hash === rehash){
            let change_success = callApi2("POST", 'http://127.0.0.1:5000/staff_change_pw', {'data': JSON.stringify(requestPayload)});
            if(change_success.row_updated){
                alert('Password reset successfully!');
                window.location.href = 'staff-signin.html';
            }else{
                //wrong email and birthday combo
                alert('YOU WERE WRONG BOO');
            }
        }else{
            alert('Password do not match');
        }
    };

    function clearFields() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    }

});
