const postButton = document.querySelector('.header_register-post');
const books = document.getElementsByClassName('book');

if (postButton) {
    postButton.addEventListener('click', () => window.location.href = '/post')
}

for(book of books) {
    book.addEventListener('click', function () {
        const bookID = this.id;
        window.location.href = `/book?id=${bookID}`
    });
}