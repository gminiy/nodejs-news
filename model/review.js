const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const Review = new Schema({
    bookId: { 
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    registrationDate: {
        type: Date,
        dafault: Date.now
    }
});

Review.statics.create = function ({ bookId, writer, content }) {
    return review = new this({ bookId, writer, contentn });
}

exports.Review = mongoose.model('Review', Review);
exports.DeletedReivew = mongoose.model('DeletedReview', Review);