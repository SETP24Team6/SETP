document.addEventListener('DOMContentLoaded', function () {
    const accountOptions = document.querySelectorAll('.account-option');
    const sections = document.querySelectorAll('.update-profile-section, .order-history-section, .reward-points-section');

    accountOptions.forEach(option => {
        option.addEventListener('click', function (event) {
            event.preventDefault();

            const sectionToShow = document.querySelector(option.getAttribute('href'));

            // Check if the clicked section is already visible
            const isVisible = sectionToShow.style.display === 'block';

            // Hide all sections first
            sections.forEach(section => section.style.display = 'none');

            // If the clicked section was not visible, show it
            if (!isVisible) {
                sectionToShow.style.display = 'block';
                sectionToShow.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const tabLinks = document.querySelectorAll('.tablinks');
    tabLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            openTab(event, event.currentTarget.getAttribute('data-tab'));
            // Scroll to the tab content
            document.getElementById(event.currentTarget.getAttribute('data-tab')).scrollIntoView({ behavior: 'smooth' });
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
