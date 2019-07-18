const morgan = require('morgan');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`runnning at ${port}`);
});