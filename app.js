const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./configs/config');
const app = express();
const port = process.env.PORT || 3000;

require('./db-connect')();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('jwt-secret', config.secret);
const passport = require('./src/passport')(app);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', require('./routes/auth')(passport));
app.listen(port, () => {
    console.log(`runnning at ${port}`);
});