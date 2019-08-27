const xhr = new XMLHttpRequest();
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const publisher = document.querySelector('.publisher');
const publicationDate = document.querySelector('.publicationDate');
const description = document.querySelector('.description');
const registerButton = document.querySelector('.register-button');


const register = () => {
    xhr.open('POST', '/book/register');
    xhr.setRequestHeader('Content-Type', 'application/json');
    const info = {
        "title": title.value, 
        "author": author.value,
        "publisher": publisher.value,
        "publicationDate": publicationDate.value,
        "description": description.value
    };
    xhr.send(JSON.stringify(info));
    xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
            window.location.href = '/';
        }
    }
}

registerButton.addEventListener('click', register);