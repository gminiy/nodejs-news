const Book = require('../../model/book').Book;
const DeletedBook = require('../../model/book').DeletedBook;
const transformDate = require('../../src/transform-date');

module.exports = {
    // book schema에 좋아요 누른 유저 리스트 추가. 리스트에 유저가 있으면 좋아요 취소, 없으면 좋아요 리스트에 유저 추가.
    async updateUsersPushedLike (request, response, next) {
        try {
            const bookId = request.query.id;
            const userId = request.user.id;
            const book = await Book.findById(bookId);
            const usersPushedLike = JSON.parse(book.usersPushedLike);
            const indexOfUser = usersPushedLike.indexOf(userId);
            if (indexOfUser === -1) {
                usersPushedLike.push(userId);
                book.usersPushedLike = JSON.stringify(usersPushedLike);
                await book.save();
                response.send('like');
            } else {
                usersPushedLike.splice(indexOfUser, 1);
                book.usersPushedLike = JSON.stringify(usersPushedLike);
                await book.save();
                response.send('noLike');
            }
        } catch(error) {
            next(error);
        }
    },

     async renderUpdatePage (request, response, next) {
        try {
            const bookId = request.query.id;
            const book = await Book.findById(bookId);
            const bookInfo = {
                'book': book,
                'nickname':request.user.nickname,
                'isAdmin':(request.user.authority === 'admin'),
                'publicationDate': transformDate(book.publicationDate)
            }
            response.render('update', bookInfo);
        } catch(error) {
            next(error);
        }
    },

    async renderAbookPage(request, response, next) {
        try {
            const Review = require('../../model/review').Review;
            const bookId = request.query.id;
            const book = await Book.findById(bookId);
            const reviews = await Review.findByBookId(bookId);
            const usersPushedLike = JSON.parse(book.usersPushedLike);
            const bookInfo = {
                'book': book,
                'nickname':request.user.nickname,
                'isAdmin':(request.user.authority === 'admin'),
                'publicationDate': transformDate(book.publicationDate),
                'registrationDate': transformDate(book.registrationDate),
                'likeCount': usersPushedLike.length,
                'isUserLikeThisBook': usersPushedLike.includes(request.user.id),
                'reviews': reviews
            }
            response.render('book', bookInfo);
        } catch(error) {
            next(error);
        }
    },

    async register(request, response, next) {
        try {
            const info = { title, author, publisher, publicationDate, description } = request.body;
            const book = await Book.create(info);
            await book.save();
            return response.redirect('/');
        } catch(error) {
            next(error);
        }
    },

    async update(request, response, next) {
        try {
            const bookId = request.query.id;
            const info = { title, author, publisher, publicationDate, description } = request.body;
            info.registrationDate = Date.now();
            await Book.findByIdAndUpdate(bookId, info);
            return response.send();
        } catch(error) {
            next(error);
        }
    },

    async delete(request, response, next) {
        // deletedBook collection으로 document 복사 후 삭제.
        // 해당 책의 review 들도 deletedReviews로 복사 후 삭제.
        try {
            const bookId = request.query.id;
            const book = await Book.findById(bookId);
            const deletedBook = await new DeletedBook(book.toObject());
            await deletedBook.save();
            await book.remove();

            const Review = require('../../model/review').Review;
            const DeletedReview = require('../../model/review').DeletedReview;
            const reviews = await Review.findByBookId(bookId);
            reviews.forEach(async (review)=>{
                const deletedReview = await new DeletedReview(review.toObject());
                await deletedReview.save();
            });
            await Review.deleteMany( { bookId });
            return response.send();
        } catch(error) {
            next(error);
        }
    }
}