const express = require('express');

const restAPI = require('./v1/rest.js');

const app = express();

const host= '127.0.0.1';
const port = 3000;

app.use(express.static('public'));

app.use('/v1',restAPI);

app.listen(port, host, () => {
    console.log(' server is running. http://'+host+':'+port);
});

app.on('connection', () => {
    console.log('Новое подключение');
});
