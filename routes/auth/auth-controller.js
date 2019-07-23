const User = require('../../model/user');
const jwt = require('jsonwebtoken');

module.exports = {
    register : (request, response) => {
        const onError = (error) => {
            if (typeof(error) === "string") {
                response.status(409);
                response.send(error);
            } else if (error.errmsg) {
                response.status(409).send(error.errmsg);
            } else {
                console.log(error);
                response.status(503).send(error);
            }
        }

        const create = () => {
                let { email, password, nickname } = request.body;
                if (!email || !password || !nickname) {
                    return Promise.reject("email, password and nickname is required");
                }
                const user = User.create( email, password, nickname );
                return user;
        }

        const respond = () => response.redirect('/');

        return create()
        .then(respond)
        .catch(onError);
    },

    login : (request, response) => {
        const { email, password } = request.body;
        const secret = request.app.get('jwt-secret');
    
        const onError = (error) => {
            console.log(error);
            res.status(409).send(error.message);
        }

        const check = (user) => {
            if (!user) return Promise.reject("Invalided email!");
            if(user.verify(password)) {
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            email: user.email,
                            nickname: user.nickname,
                            authority: user.authority
                        }, 
                        secret, 
                        {
                            expiresIn: '7d',
                            issuer: 'Ingleby',
                            subject: 'userInfo'
                        }, (error, token) => {
                            if (err) reject(error);
                            resolve(token) ;
                        })
                    });
                return p;
            }
        }

        const respond = (token) => {
            response.json({
                "message" : 'login success',
                token
            });
        }

        User.findOneByEmail(email)
        .then(check)
        .then(respond)
        .catch(onError);
    },
    
    sendUserInfo: (request, response) => {
        return response.json(request.user);
    }
}