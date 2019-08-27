const postButton = document.getElementsByClassName('header_register-post');

if (postButton) {
    postButton.addEventListener('click', () => window.location.href = '/post')
}