const router = require('express').Router();
const authController = require('./auth-controller');

module.exports = (passport) => {
    router.post('/register', authController.register);
    router.post('/login', authController.login);
    router.get('/logout', authController.logout);
    router.get('/user', passport.authenticate("jwt", { session: false }), authController.sendUserInfo)
    return router;
}