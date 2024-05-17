let timeout;

function startCountdown() {
    let duration = 60;
    const button = document.getElementById('sendSMS');
    button.disabled = true;

    const interval = setInterval(() => {
        button.textContent = `重新发送(${duration--}秒)`;
        if (duration < 0) {
            clearInterval(interval);
            button.textContent = '发送短信';
            button.disabled = false;
        }
    }, 1000);
}

function register() {
    clearTimeout(timeout); 
    const phoneNumber = document.getElementById('phoneNumber').value;
    const smsCode = document.getElementById('smsCode').value;
    const agreement = document.getElementById('agreement').checked;

    if (!agreement) {
        alert('请勾选用户使用协议。');
        return;
    }

  
    console.log('注册信息', { phoneNumber, smsCode });
    alert('注册成功！');
}


timeout = setTimeout(() => {
    alert('您已超过10分钟无操作，自动退出注册。');
    window.location.reload(); 
}, 600000); 

document.addEventListener('click', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        alert('您已超过10分钟无操作，自动退出注册。');
        window.location.reload(); 
    }, 600000); 
});

document.addEventListener('DOMContentLoaded', function () {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const actionButton = document.querySelector('.btn-outline-secondary');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault(); // 阻止链接跳转
            const fullText = this.textContent; 
            const code = fullText.split("（")[0]; 
            actionButton.textContent = code; 
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const alertTrigger = document.getElementById('liveAlertBtn');
    const smsInput = document.getElementById('smsCode');
    const termsCheckbox = document.getElementById('gridCheck1');
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

    function appendAlert(message, type) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${message}
                              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
        alertPlaceholder.innerHTML = '';  
        alertPlaceholder.append(wrapper);
    }

    alertTrigger.addEventListener('click', function() {
        const userEnteredCode = smsInput.value;
        const correctCode = '577122'; 


        if (userEnteredCode !== correctCode) {
            appendAlert('您输入的验证码错误', 'danger');
        } else if (!termsCheckbox.checked) {
  
            appendAlert('没有选择用户使用协议', 'warning');
        } else {

            appendAlert('恭喜您，您完成了注册!', 'success');
            window.location.href = 'login.html';
        }
    });
});


function redirectToLogin() {
    if (validateForm()) {
        const phoneNumber = document.getElementById('phoneNumber').value;
        localStorage.setItem('registeredPhoneNumber', phoneNumber);
        window.location.href = 'login.html';
    }
}

