const deleteButtons = document.getElementsByClassName('book_delete-button');
const updateButtons = document.getElementsByClassName('book_update-button');
const likeButton = document.querySelector('.likeButton');
const reviewsRegisterButton = document.querySelector('.reviews_register-button');
const reviewDeleteButtons = document.getElementsByClassName('review_delete-button');

for (reviewDeleteButton of reviewDeleteButtons) {
    reviewDeleteButton.addEventListener('click', () => {
        const reviewId = event.target.parentNode.parentNode.id;
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200) {
                    location.reload();
                } else {
                    console.error(xhr.responseText);
                }
            }
        }
        xhr.open('DELETE', `/review?id=${reviewId}`);
        xhr.send();
    })
}

reviewsRegisterButton.addEventListener('click', () => {
    const reviewsRegisterForm = document.querySelector('.reviews_register-form');
    if (reviewsRegisterForm.style.display === 'flex') {
        reviewsRegisterForm.style.display = 'none';
    } else {
        reviewsRegisterForm.style.display = 'flex';
        const reviewRegisterButton = document.querySelector('.reviews_register-form_register-button');
        reviewRegisterButton.addEventListener('click', () => {
            const content = document.querySelector('.reviews_register-form_content').value;
            const bookId = event.target.parentNode.parentNode.id;
            const xhr = new XMLHttpRequest();
            const info = {
                "bookId": bookId,
                "content": content
            }
            if (info.content === "") return alert('내용을 입력하세요!');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200) {
                        location.reload();
                    } else {
                        console.error(xhr.responseText);
                    }
                }
            }
            xhr.open('POST', `/review`);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(info));
        });
    }
});


for (deleteButton of deleteButtons) {
    deleteButton.addEventListener('click', (event) => {
        const book = event.target.parentNode.parentNode;
        const bookID = book.id;
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200) {
                    window.location.href = '/';
                } else {
                    console.error(xhr.responseText);
                }
            }
        }
        xhr.open('DELETE', `/book/?id=${bookID}`);
        xhr.send();
    });
}

for (updateButton of updateButtons) {
    updateButton.addEventListener('click', (event) => {
        const book = event.target.parentNode.parentNode;
        const bookID = book.id;
        window.location.href = `/book/update?id=${bookID}`;
    });
}

likeButton.addEventListener('click', function () {
    const xhr = new XMLHttpRequest();
    const likeBox = this.childNodes[0];
    const likeCount = likeBox.innerText;
    const bookId = this.parentNode.id;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                if (xhr.responseText === 'like') {
                    likeBox.style.color = 'red';
                    likeBox.innerText = Number(likeCount) + 1;
                } else if (xhr.responseText === 'noLike') {
                    likeBox.style.color = 'black';
                    likeBox.innerText = Number(likeCount) - 1;
                }
            } else {
                console.error(xhr.responseText);
            }
        }
    }
    xhr.open('PUT', `/book/like/?id=${bookId}`);
    xhr.send();
});