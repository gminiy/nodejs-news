const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const Book = new Schema({
    title: { 
        type: String,
        required: true,
    },
    registrationDate: { 
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        default: null
    },
    publisher: {
        type: String,
        required: true,
    },

    publishedDate: {
        type: Date,
        dafault: null
    },
    description: {
        type: String,
        dafault: null
    },
    like: {
        type: Number,
        default: 0
    },
    hate: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        default: null
    }
});

Book.statics.create = function ({ title, author, publisher, publishedDate, description, category }) {
    return book = new this({ title, author, publisher, publishedDate, description, category });
}
 
module.exports = mongoose.model('Book', Book);