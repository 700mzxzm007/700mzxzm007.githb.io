function validateLogin() {
    var phone = document.getElementById('phone').value;
    var password = document.getElementById('password').value;
    var defaultPassword = phone; 


    var storedPassword = localStorage.getItem(phone);


    if (password === defaultPassword) {

        document.getElementById('login-form').style.display = 'none';
        document.getElementById('reset-form').style.display = 'block';
        return false;
    } else if (password === storedPassword) {

        window.location.href = 'manage.html';
        return false;
    } else {
        alert('账号和密码不正确');
        return false;
    }
}

function validateReset() {
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value; 


    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(newPassword)) {
        alert('密码要数字和字母组成且长度要大于六位');
        return false;
    }

 
    if (newPassword !== confirmPassword) {
        alert('两次密码不一致');
        return false;
    }

   
    if (!/@/.test(email)) {
        alert('请输入正确的电子邮箱');
        return false;
    }


    localStorage.setItem(phone, newPassword);

    alert('密码更新成功，请重新登录');
    document.getElementById('reset-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';

    // 预填手机号和新密码
    document.getElementById('phone').value = phone;
    document.getElementById('password').value = newPassword;

    return false;
}



function checkPasswordStrength() {
    var password = document.getElementById("newPassword").value;
    var strengthText = document.getElementById("passwordStrength");
    var strength = 0;


    if (password.length <= 4) {
        strength += 5;
    } else if (password.length <= 7) {
        strength += 10;
    } else {
        strength += 25;
    }


    var hasLower = /[a-z]/.test(password);
    var hasUpper = /[A-Z]/.test(password);
    if (hasLower && hasUpper) {
        strength += 20;
    } else if (hasLower || hasUpper) {
        strength += 10;
    }

    var hasNumber = /\d/.test(password);
    if (hasNumber) {
        strength += 10;
    }


    var strengthClass = "";
    if (strength <= 10) {
        strengthText.innerHTML = "弱";
        strengthClass = "text-danger";
    } else if (strength <= 20) {
        strengthText.innerHTML = "偏弱";
        strengthClass = "text-warning";
    } else if (strength <= 35) {
        strengthText.innerHTML = "中";
        strengthClass = "text-info";
    } else if (strength <= 45) {
        strengthText.innerHTML = "较强";
        strengthClass = "text-primary";
    } else {
        strengthText.innerHTML = "强";
        strengthClass = "text-success";
    }

    strengthText.className = strengthClass;
}


document.addEventListener('DOMContentLoaded', function() {
    const registeredPhoneNumber = localStorage.getItem('registeredPhoneNumber');
    if (registeredPhoneNumber) {
        document.getElementById('phone').value = registeredPhoneNumber;
    }
});
