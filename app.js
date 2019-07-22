const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const dbConfig = require('./configs/db-config');
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('hello world');
});

app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`runnning at ${port}`);
});


require('./db-connect')(dbConfig);