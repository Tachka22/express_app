const express = require('express');
const restAPI = require('./v1/rest.js');
const restAPI2 =require('./v2/rest2.js');

const host= '127.0.0.1';
const port = 3000;

const app = express();



app.use(express.static('public'));

app.use('/v1',restAPI);

app.use('/v2',restAPI2);



app.listen(port, host, () => {
    console.log(' server is running. http://'+host+':'+port);
});

app.on('connection', () => {
    console.log('Новое подключение');
});
