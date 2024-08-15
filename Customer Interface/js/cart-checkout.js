if (cookie("type") == 'staff') {
    window.location.href = 'Staff-OrderManagement.html';
}
if (!cookie("userid")) {
    window.location.href = 'order-now.html';
}

document.addEventListener('DOMContentLoaded', function () {
    if (!cookie("userid")) {
        window.location.href = 'order-now.html';
    }
    if (!cookie("order_id")) {
        window.location.href = 'create-sandwich.html';
    }


    lastCheckOut = callApi2("POST", 'http://127.0.0.1:5000/last_checkout', 
        {'data': JSON.stringify(cookie('order_id'))});

    console.log('Order Number:', lastCheckOut);

    // Debugging log for parsed order details
    document.getElementById('order-number').textContent = lastCheckOut[0]["order_id"];
    document.getElementById('total-amount').textContent = '$'+parseFloat(lastCheckOut[0]["order_price"]).toFixed(2);
    var t=new Date(lastCheckOut[0]["order_timestamp"]);
    var testme = new Date(t.getTime() + (30*60000) - (28800000))
    pickupTime = ""
    if(testme.getHours()>12){
        pickupTime = (testme.getHours()-12).toString() + ":" + testme.getMinutes() + " PM"
    }else{
        pickupTime = testme.getHours().toString() + ":" + testme.getMinutes() + " AM"
    }
    document.getElementById('pickup-time').textContent = pickupTime;

    // Calculate and display points earned
    // const pointsEarned = Math.floor(parseFloat(totalAmount));
    document.getElementById('reward_points').textContent = Math.floor(parseFloat(lastCheckOut[0]["order_price"])/4) ;

    document.querySelectorAll('.toggle-ingredients').forEach(button => {
        button.addEventListener('click', function () {
            this.previousElementSibling.classList.toggle('hidden');
        });
    });
});
