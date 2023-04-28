const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

// Создаем экземпляр Router
const router = express.Router();


//Функции Middleware
// Обработка запросов на несуществующий путь
function handleInvalidPath(req, res, next) {
    res.status(400).send('Invalid Path');
}

// Используем сторонние библиотеи   к промежуточного ПО
router.use(morgan('combined'));
router.use(helmet());

router.use(express.json());


router.get('/', (req, res) => {
    res.status(200).send("<h1>Главная страница path '/v2'</h1>");
});

router.get('/api/login/:password', (req, res, next) => {
    const pass = req.params['password'];
    console.log(pass);
    if (pass !== 'secret') {
        return res.status(400).send('Unauthorized');   
    }
    res.redirect('/v2/api/data');
});
router.get('/api/data', (req, res) => {
    res.status(200).send('OK');
});
//Обработка ошибок на несуществуюший путь
router.use(handleInvalidPath);

module.exports = router;