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
    xhr.send(JSON.stringify(info));
    xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("success")
        }
    }
}

registerButton.addEventListener('click', register);

passwordForm.addEventListener('keypress', (e) => {
    const key = e.which || e.keyCode;
    if (key === 13) register();
});