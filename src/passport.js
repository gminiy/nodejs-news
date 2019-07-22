module.exports = (app) => {
    const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

    const User = require('../model/user');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => done(null, user.email));

    passport.deserializeUser( async (email, done) => {
        const user = await User.findOneByEmail(email);
        done(null, user);
    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },

        async (email, password, done) => {
            const user = await User.findOneByEmail(email)
            if(!user) {
                return done(null, false, { "message": "Incorrect Email"});
            }

            if(!user.verify(password)) {
                return done(null, false, { "message": "Incorrect Password"});
            }

            done(null, user);
        }
    ));

    return passport;
}