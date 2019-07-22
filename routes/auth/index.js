const router = require('express').Router();
const authController = require('./auth-controller');

module.exports = (passport) => {
    router.post('/regist', authController.regist);
    router.post('/login', authController.authenticate(passport));
    return router;
}