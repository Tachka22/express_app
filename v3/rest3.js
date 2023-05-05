const express = require('express');

const commentsController = require('../controllers/commentsController')

const router = express.Router();


router.use(express.json());

router.get('/comments', commentsController.getAllData);

router.post('/comments',express.json(),commentsController.validateInput,commentsController.addNewItemToData);

router.get('/comments/:id',commentsController.getDataById);


router.use((req, res) => {
    res.status(400).json({ error: 'Bad Request' });
});

module.exports = router;