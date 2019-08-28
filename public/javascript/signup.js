const xhr = new XMLHttpRequest();
const idForm = document.getElementById('id');
const passwordForm = document.getElementById('password');
const nicknameForm = document.getElementById('nickname');
const registerButton = document.getElementById('register-button');

const register = () => {
    xhr.open('POST', '/auth/register');
    xhr.setRequestHeader('Content-Type', 'application/json');
    const info = {
        "id": idForm.value,
        "password": passwordForm.value,
        "nickname": nicknameForm.value
    };

    if (info.id === "") {
        alert('ID를 입력해주세요');
    } else if (info.nickname === "") {
        alert('nickname을 입력해주세요')
    } else if (info.password === "") {
        alert('password를 입력해주세요');
    } else {
        xhr.send(JSON.stringify(info));
    }

    xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
            alert('가입되었습니다. 로그인해주세요');
            window.location.href = '/';
        } else if(xhr.status === 500) {
            alert('다시 시도해주세요.');
        }
    }
}

registerButton.addEventListener('click', register);

passwordForm.addEventListener('keypress', (e) => {
    const key = e.which || e.keyCode;
    if (key === 13) register();
});