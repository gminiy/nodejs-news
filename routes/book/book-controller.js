const Book = require('../../model/book').Book;
const DeletedBook = require('../../model/book').DeletedBook;

module.exports = {
    register : async (request, response, next) => {
        try {
            const { title, author, publisher, publishedDate, description, category } = request.body;
            const book = await Book.create( { title, author, publisher, publishedDate, description, category } );
            await book.save();
            return response.redirect('/');
        } catch(error) {
            next(error);
        }
    },

    update : async (request, response, next) => {
        try {
            const bookId = request.query.id;
            const { title, author, publisher, publishedDate, description, category } = request.body;
            await Book.findByIdAndUpdate(bookId, { title, author, publisher, publishedDate, description, category });
            return response.redirect('/');
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
            return response.redirect('/');
        } catch(error) {
            next(error);
        }
    }
}