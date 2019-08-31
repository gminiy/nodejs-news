const Review = require('../../model/review').Review;
const DeletedReview = require('../../model/review').DeletedReview;

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
    },

    delete : async (request, response, next) => {
        try {
            // 삭제하는 리뷰는 DeletedReview로 복사 후 삭제
            const reviewId = request.query.id;
            const review = await Review.findById(reviewId);
            const deletedReview = await new DeletedReview(review.toObject());
            await deletedReview.save();
            await review.remove();
            return response.status(200).send();
        } catch(error) {
            next(error);
        }
    },

    update : async (request, response, next) => {
        try {
            const reviewId = request.query.id;
            const info = { content } = request.body;
            await Review.findByIdAndUpdate(reviewId, info);
            return response.status(200).send();
        } catch(error) {
            next(error);
        }
    }
}