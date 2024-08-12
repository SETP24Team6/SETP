if (cookie("type") == 'member') {
    window.location.href = 'create-sandwich.html';
  }
  if (!cookie("userid")) {
    window.location.href = 'order-now.html';
  }

document.addEventListener('DOMContentLoaded', function () {
    let staffProfile = callApi2("POST", 'http://127.0.0.1:5000/staff_profile', 
        {'data': JSON.stringify(cookie("userid"))});
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    // const phone = document.getElementById('contact-no');
    // const birthday = document.getElementById('birthday');
    firstName.innerHTML = staffProfile.firstname
    lastName.innerHTML = staffProfile.lastname
    email.innerHTML = staffProfile.email
    // phone.value = staffProfile.phone
    // var custBirthday=new Date(staffProfile.birthday);
    // var cusMonth = parseInt(custBirthday.getMonth()+1)
    // if (cusMonth.toString().length == 1){
    //     cusMonth = '0' +cusMonth.toString()
    // }
    // var cusDate = parseInt(custBirthday.getDate())
    // if (cusDate.toString().length == 1){
    //     cusDate = '0' +cusDate.toString()
    // }
    // custBirthday = custBirthday.getFullYear() + '-' + cusMonth +'-'+cusDate
    // birthday.value = custBirthday
})