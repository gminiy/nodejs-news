const router = require('express').Router();
const reviewController = require('./review-controller');

router.post('/', reviewController.register);
router.delete('/', reviewController.delete);
module.exports = router;