const Book = require('../../model/book').Book;
const DeletedBook = require('../../model/book').DeletedBook;
const transformDate = require('../../src/transform-date');

module.exports = {
    renderUpdatePage : async (request, response, next) => {
        try {
            const bookId = request.query.id;
            const book = await Book.findById(bookId);
            response.render('update', { 'book': book, 'nickname':request.user.nickname, 'isAdmin':(request.user.authority === 'admin'), 'publicationDate': transformDate(book.publicationDate) });
        } catch(error) {
            next(error);
        }
    },

    sendOneBookInfo : async (request, response, next) => {
        try {
            const bookId = request.query.id;
            const book = await Book.findById(bookId);
            response.render('book', { 'book': book, 'nickname':request.user.nickname, 'isAdmin':(request.user.authority === 'admin'), publicationDate:transformDate(book.publicationDate), registrationDate: transformDate(book.registrationDate)});
        } catch(error) {
            next(error);
        }
    },

    register : async (request, response, next) => {
        try {
            const { title, author, publisher, publicationDate, description } = request.body;
            const book = await Book.create( { title, author, publisher, publicationDate, description } );
            await book.save();
            return response.redirect('/');
        } catch(error) {
            next(error);
        }
    },

    update : async (request, response, next) => {
        try {
            const bookId = request.query.id;
            const { title, author, publisher, publicationDate, description } = request.body;
            const registrationDate = Date.now();
            await Book.findByIdAndUpdate(bookId, { title, author, publisher, publicationDate, description, registrationDate });
            return response.send();
        } catch(error) {
            next(error);
        }
    },

    delete : async (request, response, next) => {
        //deletedBook collection으로 삭제된 책 document 이동.
        try {
            const bookId = request.query.id;
            const book = await Book.findById(bookId);
            const deletedBook = await new DeletedBook(book.toObject());
            await deletedBook.save();
            await book.remove();
            return response.send();
        } catch(error) {
            next(error);
        }
    }
}