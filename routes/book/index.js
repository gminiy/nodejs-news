const router = require('express').Router();
const bookController = require('./book-controller');
const middlewares = require('../../middlewares/middlewares')
router.post('/register', middlewares.isAdmin, bookController.register);
router.put('/update', middlewares.isAdmin, bookController.update);

module.exports = router;