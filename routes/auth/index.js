const router = require('express').Router();
const authController = require('./auth-controller');

router.post('/regist', authController.regist);

module.exports = router;