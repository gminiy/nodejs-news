const morgan = require('morgan');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwtParser = require('./middlewares/jwt-parser')
const app = express();
const port = process.env.PORT || 3000;
 
require('./src/db-connect')();

app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(jwtParser());
const passport = require('./src/passport')(app);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (request, response) => {
  if (request.isAuthenticated) {
    response.render('index');
  } else {
    response.render('login');
  }
});

app.use('/auth', require('./routes/auth')(passport));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(port, () => {
    console.log(`runnning at ${port}`);
});