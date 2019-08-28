const jwtController = require('../src/jwt-controller');

// Token 
exports.jwtParser = () => {
    return async (request, response, next) => {
                try {
                    const token = request.cookies['jwt'];
                    if (!token) {
                        request.isAuthenticated = false;
                        next();
                    } else {
                        const decodedToken = await jwtController.verifyToken(token);
                        if (decodedToken) {
                            request.user = decodedToken;
                            request.isAuthenticated = true;
                        }
                        next();
                    }
                } catch(error) {
                    if (error.name === "TokenExpiredError") {
                        request.isAuthenticated = false;
                        next();
                    } else {
                        next(error);
                    }
                }
            }
}

exports.isAdmin = (request, response, next) => {
    if(request.user.authority === 'admin') {
        next();
    } else {
        response.status(403).send("관리자만 접근이 가능합니다.");
    }
}

exports.isLoggedIn = (request, response, next) => {
    if(request.isAuthenticated) {
        next();
    } else {
        response.redirect('/login');
    }
}

exports.renderIndex = async (request, response) => {
    const Book = require('../model/book').Book;
    const books = await Book.find().exec();
    const pugVariables = {
      nickname: request.user.nickname,
      isAdmin: (request.user.authority === 'admin'),
      books: books
    }

    return response.render('index', pugVariables);
}