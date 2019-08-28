const User = require('../../model/user');
const jwtController = require('../../src/jwt-controller');

module.exports = {
    register : async (request, response, next) => {
        try {
            const { id, password, nickname } = request.body;
            const provider = 'local';
            const user = await User.create( { id, password, nickname, provider } );
            await user.save();
            return response.send();
        } catch(error) {
            next(error);
        }
    },

    login : async (request, response, next) => {
        try {
            const { id, password } = request.body;
            const user = await User.findOneById(id);

            if (user && user.verify(password)) {
                const token = await jwtController.makeToken(user);
                response.cookie('jwt', token);
                return response.send();
            }

            return response.status(403).send("Invalid User");
        } catch(error) {
            next(error);
        }
    },

    logout : (request, response) => {
        response.clearCookie('jwt');
        return response.status(200).redirect('/login');   
    },

    googleAuthenticate : (passport) => {
        return passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] })
    },

    googleCallbackAuthenticate : (passport) => {
        return passport.authenticate('google', { failureRedirect: '/login' });
    },

    setTokenToCookie: (request, response) => {
        response.cookie('jwt', request.user.token);
        response.redirect('/');
    }
}