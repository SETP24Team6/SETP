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

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (firstName === '' || lastName === '' || email === '' || message === '') {
        alert('Please fill in all required fields.');
        return;
    }

    document.getElementById('form-message').textContent = 'Message sent successfully!';

    document.getElementById('contact-form').reset();
});

// Add class to body to trigger CSS animations
document.body.classList.add('loaded');
