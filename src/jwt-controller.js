const jwt = require('jsonwebtoken');
const { secret } = require('../configs/config');

module.exports = {
        makeToken: (user) => {
            return new Promise((resolve, reject) => {
                jwt.sign({
                        id: user.id,
                        nickname: user.nickname,
                        authority: user.authority
                    },
                    secret, {
                        expiresIn: '1d',
                        issuer: 'Ingleby',
                        subject: 'userInfo'
                    }, (err, token) => {
                        if (err) reject(err);
                        resolve(token);
                    });
            });
        },

        verifyToken: (token) => {
            return new Promise((resolve, reject) => {
                    jwt.verify(token, secret, (error, decoded) => {
                        if (error) reject(error);
                        resolve(decoded);
                    });
                });
        }
}