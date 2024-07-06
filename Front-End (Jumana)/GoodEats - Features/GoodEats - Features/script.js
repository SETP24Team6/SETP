// script.js
function redirectTo(page) {
    if (page === 'customer') {
        window.location.href = 'customer.html';
    } else if (page === 'business') {
        window.location.href = 'business.html';
    }
}
// script.js

// Commenting out smooth scrolling for now
// document.querySelectorAll('.nav-links a').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

// script.js

// Back-to-top button functionality
const backToTopButton = document.createElement('button');
backToTopButton.textContent = '↑';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Form field focus effects
document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.classList.add('focused');
    });
    field.addEventListener('blur', () => {
        field.parentElement.classList.remove('focused');
    });
});

// Typewriter effect for the main text on index.html
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("typewriter-text");
    const cursorElement = document.getElementById("cursor");
    const text = "Transforming your wellness journey while growing a strategic business";

    let charIndex = 0;

    function type() {
        if (charIndex < text.length) {
            textElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100); // Adjust typing speed here
        } else {
            cursorElement.style.display = 'none'; // Hide cursor after typing is complete
        }
    }

    if (textElement && cursorElement) {
        type();
    }
});
