document.addEventListener('DOMContentLoaded', function () {
    const accountOptions = document.querySelectorAll('.account-option');
    const sections = document.querySelectorAll('.update-profile-section, .order-history-section, .reward-points-section');
    const orderHistory = document.getElementById('order-history');
    let populator = callApi2("POST", 'http://127.0.0.1:5000/get_5_orders', 
        {'data': JSON.stringify(cookie("userid"))});
    if(populator){
        orderHistory.innerHTML = ""
        const orders = []
        $.each(populator, function(index, order) {
            order_details = '<div class="order-item" data-choice="'+order.order_id+'"><div>'
            var t=new Date(order.order_timestamp);
            var testme = new Date(t.getTime() - (28800000))
            if (parseInt(testme.toString().slice(16,18)) < 13){
                testme = testme.toString().slice(0,21) + "AM"
            }else{
                testme = testme.toString().slice(0,16) + (parseInt(testme.toString().slice(16,18))-12).toString() + testme.toString().slice(18,21) + "PM"
            }
            
            order_details += '<h2>'+testme+'</h2>'
            for (x in order.order_ingred){
                for (y in order.order_ingred[x]){
                    order_details += '<p><h3 style="margin:0px;padding:0px;">'+y+'</h3>'
                    for (z in order.order_ingred[x][y]){
                        order_details += order.order_ingred[x][y][z]+'<br>'
                    }
                    order_details += '</p>'
                }
            }
            order_details += '<h2>Total: $'+parseFloat(order.order_price).toFixed(2)+'</h2></div>'
            order_details += '<div class="order-actions"><button class="reorder-button">Re-Order</button></div>'
            orderHistory.innerHTML += order_details
        })


    }

    let custProfile = callApi2("POST", 'http://127.0.0.1:5000/cust_profile', 
        {'data': JSON.stringify(cookie("userid"))});
    console.log(custProfile)
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const phone = document.getElementById('contact-no');
    const birthday = document.getElementById('birthday');
    firstName.value = custProfile.firstname
    lastName.value = custProfile.lastname
    email.value = custProfile.email
    phone.value = custProfile.phone
    var custBirthday=new Date(custProfile.birthday);
    var cusMonth = parseInt(custBirthday.getMonth()+1)
    if (cusMonth.toString().length == 1){
        cusMonth = '0' +cusMonth.toString()
    }
    custBirthday = custBirthday.getFullYear() + '-' + cusMonth +'-'+custBirthday.getDate()
    birthday.value = custBirthday

    const reorderButtons = document.querySelectorAll('.reorder-button');
    reorderButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const recommendationItem = e.target.closest('.order-item');
            const order_id = recommendationItem.getAttribute('data-choice');
            callApi2("POST", 'http://127.0.0.1:5000/reorderitems', 
                { 'data': JSON.stringify([order_id, cookie('userid')]) })
            window.location.href='create-sandwich.html'
        });
    });

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
