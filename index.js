const express = require('express'),
    morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('Welcome to my app!');
});

app.get('/secreturl', (req, res) => {
    res.send('Secret URl');
});

app.listen(8080, () => {
    console.log('app is listening on port 8080');
});