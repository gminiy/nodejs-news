const jwtController = require('../src/jwt-controller');

exports.paginate = (perPage) => {
    //Pagination : query 로 page 전달. 한 페이지에 8개 표시(perPage)
    return async (request, response, next) => {
        const Book = require('../model/book').Book;
        const bookCount = await Book.countDocuments().exec();;
        let page = request.query.page;
        if (!page) page = 1;
        const skip = (page-1) * perPage;

        request.page = page;
        request.totalPage = Math.floor(bookCount/perPage) + 1;
        request.books = await Book.find({}, null, { skip, limit:perPage }).exec();

        next();
    }
}

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