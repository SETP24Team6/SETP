document.addEventListener('DOMContentLoaded', function () {
    const accountOptions = document.querySelectorAll('.account-option');
    const sections = document.querySelectorAll('.update-profile-section, .order-history-section, .reward-points-section');

    accountOptions.forEach(option => {
        option.addEventListener('click', function (event) {
            event.preventDefault();

            // Hide all sections first
            sections.forEach(section => section.style.display = 'none');

            // Show the clicked section
            const sectionToShow = document.querySelector(option.getAttribute('href'));
            sectionToShow.style.display = 'block';

            // Scroll to the section
            sectionToShow.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
