const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const restAPI = require('./v1/rest.js');
const restAPI2 =require('./v2/rest2.js');
const restAPI3 =require('./v3/rest3.js');
const restAPI4 =require('./v4/rest4.js');




const host= '127.0.0.1';
const port = 3000;

const app = express();

app.use(morgan('dev'));

app.use(helmet());

app.use(express.static('public'));

app.use('/v1',restAPI);

app.use('/v2',restAPI2);

app.use('/v3',restAPI3);

app.use('/v4',restAPI4);

app.listen(port, host, () => {
    console.log(' server is running. http://'+host+':'+port);
});

app.on('connection', () => {
    console.log('Новое подключение');
});



