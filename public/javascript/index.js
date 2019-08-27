const postButton = document.querySelector('.header_register-post');
const deleteButtons = document.getElementsByClassName('delete-button');

if (postButton) {
    postButton.addEventListener('click', () => window.location.href = '/post')
}


for (deleteButton of deleteButtons) {
    deleteButton.addEventListener('click', (event) => {
        const book = event.target.parentNode;
        const bookID = book.id;
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === xhr.DONE) {
                if(xhr.status === 200) {
                    book.parentNode.removeChild(book);
                } else {
                    console.error(xhr.responseText);
                }
            }
        }
        xhr.open('DELETE', `/book/?id=${bookID}`);
        xhr.send();
    });
}