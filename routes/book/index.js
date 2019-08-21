const router = require('express').Router();
const bookController = require('./book-controller');

router.post('/register', bookController.register);

module.exports = router;