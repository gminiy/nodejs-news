const User = require('../../model/user');

module.exports = {
    regist : (request, response) => {
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
                const { email, password, nickname } = request.body;
                if (!email || !password || !nickname) {
                    return Promise.reject("email, password and nickname is required");
                }
                const user = User.create( email, password, nickname )
                return user;
        }

        const respond = (user) => response.send(user);

        return create()
        .then(respond)
        .catch(onError)
    }
}