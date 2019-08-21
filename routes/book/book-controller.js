const Book = require('../../model/book');

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
            const bookId = request.url.split('/')[2];
            const { title, author, publisher, publishedDate, description, category } = request.body;
            await Book.findByIdAndUpdate(bookId, { title, author, publisher, publishedDate, description, category });
            return response.redirect('/');
        } catch(error) {
            next(error);
        }
    }
}