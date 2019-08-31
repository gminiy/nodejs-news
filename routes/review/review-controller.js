const Review = require('../../model/review').Review;

module.exports = {
    register : async (request, response, next) => {
        try {
            const info = { bookId, content } = request.body;
            info.writer = request.user.nickname;
            const review = await Review.create(info);
            await review.save();
            return response.status(200).send();
        } catch(error) {
            next(error);
        }
    }
}