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
    return review = new this({ bookId, writer, content });
}

Review.statics.findByBookId = function (bookId) {
    return this.find({ 'bookId': bookId });
}

Review.methods.copy = async function (Model) {
    const deletedReview = await new Model(this.toObject());
    return deletedReview.save();
}

exports.Review = mongoose.model('Review', Review);
exports.DeletedReview = mongoose.model('DeletedReview', Review);