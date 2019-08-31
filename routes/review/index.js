const router = require('express').Router();
const reviewController = require('./review-controller');

router.post('/', reviewController.register);
module.exports = router;