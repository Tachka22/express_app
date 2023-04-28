const express = require('express');



let comments = [ "Comments1", "Comments2"];
let commentsPass = [ "Comments1withPass", "Comments2withPass"];
// Создаем экземпляр Router
const router = express.Router();


//Функции Middleware
// Обработка запросов на несуществующий путь
function handleInvalidPath(req, res) {
    res.status(400).send('Invalid Path');
}
function authenticateApiKey(req, res, next) {
    const pass = req.params['password'];
    console.log(pass);
    if (pass=="secret") {
        next();
    }
    else{
        return res.status(400).send('Unauthorized');
    }
};
function validateInput(req, res, next) {
    const body = req.body;
    if(body['comment'] == undefined){
        return res.status(400).json({ error: 'Invalid input' });
    }
    else{
        next();
    }
}


router.use(express.json());

router.get('/', (req, res) => {
    res.status(200).send("<h1>Главная страница path '/v2'</h1>");
});

router.get('/comments',  (req, res)=>{

    res.status(200).json(comments);
});

router.get('/comments/:password',authenticateApiKey, (req, res) => {

    res.status(200).json(commentsPass);
});


router.post('/comments/:password', authenticateApiKey, validateInput, (req, res)=>{
    commentsPass.push(...req.body['comment']);
    res.status(200).json(commentsPass);
});


//Обработка ошибок на несуществуюший путь
router.use(handleInvalidPath);

module.exports = router;