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
    
    function callApi2(method, url, data) {
        var result = [];
        $.ajax({
            method: method,
            url: url,
            data: data,
            async: false,
            success: function(data) {
                result =  data;
            }
        });
        return result;
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
            window.location.href = 'create-sandwich.html';
        }
    };

    closeElements.forEach(close => {
        close.onclick = function () {
            modal.style.display = 'none';
        };
    });

    // window.onclick = function (event) {
    //     if (!event.target.closest('.modal-content')) {
    //         modal.style.display = 'flex';
    //     }
    // };

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
        var requestUser = {
            email: document.getElementById('email').value,
            phone: "1"
        }
        
        let checker = callApi2("POST", 'http://127.0.0.1:5000/checkuser', {'data': JSON.stringify(requestUser)});
        if (checker.exists){
            hash = hex_md5(document.getElementById('password').value);
            var requestPayload = {
                email: document.getElementById('email').value,
                passwordhash: hash
            };
            let login_success = callApi2("POST", 'http://127.0.0.1:5000/login', {'data': JSON.stringify(requestPayload)});
            
            if(login_success.name){
                alert('Logged in successfully!');
                cookie.set({
                    userid: login_success.userid,
                    username: login_success.name
                });
                // JU LOOK HERE LOOK AT ME PLEASE
                document.getElementById('order-container').style.display = 'block';
                modal.style.display = 'none';
                // FIX ME PLEASE
            }else{
                alert('Wrong Password!');
            }
        }else{
            alert('No such email!');
        };
    };

    signupForm.onsubmit = function (event) {
        event.preventDefault();
        var requestUser = {
            email: document.getElementById('email-signup').value,
            phone: document.getElementById('phone').value
        }
        
        let checker = callApi2("POST", 'http://127.0.0.1:5000/checkuser',
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
            callApi("POST", 'http://127.0.0.1:5000/signup',
                {'data': JSON.stringify(requestPayload)});
            alert('Account created successfully!');
            document.getElementById('order-container').style.display = 'block';
            modal.style.display = 'none';
        } else {
            alert('Phone or Email already exist!');
        }
        
    };

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
            let change_success = callApi2("POST", 'http://127.0.0.1:5000/change_pw', {'data': JSON.stringify(requestPayload)});
            if(change_success.row_updated){
                alert('Password reset successfully!');
                modal.style.display = 'none';
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

    modal.style.display = 'flex';
});
