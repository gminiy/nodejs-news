const router = require('express').Router();
const authController = require('./auth-controller');

module.exports = (passport) => {
    router.post('/register', authController.register);
    router.post('/login', authController.login);
    router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
    router.get('/google/callback',
        passport.authenticate('google', { failureRedirect: '/login.html' }),
        (request, response) =>  {
            response.cookie('jwt', request.user.token);
            response.redirect('/');
        } );
    return router;
}