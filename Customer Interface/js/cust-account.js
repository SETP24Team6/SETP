document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.account-option');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const rewardLink = document.querySelector('.reward-link');
    rewardLink.addEventListener('click', function (e) {
        e.preventDefault();
        const rewardSection = document.querySelector('#reward-points');
        if (rewardSection) {
            rewardSection.style.display = 'block';
            rewardSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    const tabs = document.querySelectorAll('.tab button');
    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            const tabcontent = document.querySelectorAll('.tabcontent');
            tabcontent.forEach(content => content.style.display = 'none');
            tabs.forEach(btn => btn.className = btn.className.replace(' active', ''));
            document.getElementById(this.innerText).style.display = 'block';
            this.className += ' active';
        });
    });
    document.getElementById('Summary').style.display = 'block';
    document.querySelector('.tab button').className += ' active';
});

function openTab(evt, tabName) {
    const tabcontent = document.querySelectorAll('.tabcontent');
    tabcontent.forEach(content => content.style.display = 'none');

    const tablinks = document.querySelectorAll('.tablinks');
    tablinks.forEach(link => link.className = link.className.replace(' active', ''));

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}
