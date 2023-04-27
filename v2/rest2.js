const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

// Создаем экземпляр Router
const router = express.Router();

//Функции Middleware
//----------------------------------------------------------------
// Обработка запросов на несуществующий путь
function handleInvalidPath(req, res, next) {
    res.status(400).send('Invalid Path');
}

    // Проверка пользовательского ввода
    // Если ввод невалидный, отправляем ответ с ошибкой 400
function validateUserInput(req, res, next) {
    if (!req.body.name) {
        return res.status(400).send('Name is required');   
    }
    next();
}

// Аутентификация по ключу API в URL параметрах
function authenticateAPIKey(req, res, next) {
    const apiKey = req.query.api_key;
    if (apiKey !== 'secret') {
        return res.status(400).send('Unauthorized');
    }
    next();
}
//----------------------------------------------------------------
// Используем сторонние библиотеи   к промежуточного ПО
router.use(morgan('combined'));
router.use(helmet());

//Пользовательских функций промежуточного ПО
router.use(validateUserInput);//Проверка на валидность
router.use(authenticateAPIKey);//Авторизация

//Маршруты
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/api', (req, res) => {
    const apiKey = req.query.api_key;
    res.send(apiKey.toString());
});
//Обработка ошибок на несуществуюший путь
router.use(handleInvalidPath);