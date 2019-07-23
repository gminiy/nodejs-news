module.exports = (app) => {
    const passport = require('passport');
    const JwtStrategy = require('passport-jwt').Strategy;
    const ExtractJwt = require('passport-jwt').ExtractJwt;
    const config = require('../configs/config')

    const params = {}
    params.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    params.secretOrKey = config.secret;
 
    app.use(passport.initialize());
    
    passport.use( new JwtStrategy(params, async (user, done) => done(null, user)) );

    return passport;
}