const morgan = require('morgan');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const middlewares = require('./middlewares/middlewares')
const app = express();
const port = process.env.PORT || 3000;

require('./src/db-connect')();

app.use(morgan('dev'));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(middlewares.jwtParser());
const passport = require('./src/passport')(app);

// 로그인한 회원만 홈으로 이동 가능.
app.get('/', middlewares.isLoggedIn, middlewares.paginate(perPage = 8), async (request, response) => {
  const pugVariables = {
    nickname: request.user.nickname,
    isAdmin: (request.user.authority === 'admin'),
    books: request.books,
    page: request.page,
    totalPage: request.totalPage
  }
  return response.render('index', pugVariables);
});
app.get('/signup', (request, response) => response.render('signup'));
app.get('/login', (request, response) => response.render('login'));
app.get('/post', (request, response) => response.render('post', { nickname:request.user.nickname }));

app.use('/auth', require('./routes/auth')(passport));
app.use('/book', require('./routes/book'));
app.use('/review', require('./routes/review'));

app.use((error, request, response, next) => {
  console.log(error);
  response.render('error');
});

app.listen(port, () => console.log(`runnning at ${port}`));