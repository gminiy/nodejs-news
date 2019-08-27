const router = require('express').Router();
const bookController = require('./book-controller');
const middlewares = require('../../middlewares/middlewares');

router.get('/', bookController.sendOneBookInfo);
router.delete('/', middlewares.isAdmin, bookController.delete);
router.post('/register', middlewares.isAdmin, bookController.register);
router.get('/update', middlewares.isAdmin, bookController.renderUpdatePage);
router.put('/update', middlewares.isAdmin, bookController.update);

module.exports = router;