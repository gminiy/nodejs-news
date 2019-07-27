const jwt = require('jsonwebtoken');
const { secret } = require('../configs/config');

module.exports = {
    makeToken : (user) => {
        return new Promise((resolve, reject) =>{
            jwt.sign(
                {
                    email: user.email,
                    nickname: user.nickname,
                    authority: user.authority
                },
                secret,
                {
                    expiresIn: '3d',
                    issuer: 'Ingleby',
                    subject: 'userInfo'
                }, (err, token) => {
                    if(err) reject(err);
                    resolve(token);
                });
        });
    },

    cookieExtractor: (request) => {
        let token = request.cookies['jwt'];
        if (token) {
            return token;
        } else {
            throw Error("no token");
        }
    }
}