const xhr = new XMLHttpRequest();
const emailForm = document.getElementById('email');
const passwordForm = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');
const googleLoginButton = document.getElementById('google-lopgin-button');

const login = () => {
    xhr.open('POST', '/auth/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    const info = {
        "email": emailForm.value,
        "password": passwordForm.value
    };
    xhr.send(JSON.stringify(info));
    xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("success")
        }
    }
}

loginButton.addEventListener('click', login);

passwordForm.addEventListener('keypress', (e) => {
    const key = e.which || e.keyCode;
    if (key === 13) login();
});

signupButton.addEventListener('click', () => {
    window.location.href = './signup';
})