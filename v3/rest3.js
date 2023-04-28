const express = require('express');

const {getAllData, getDataById,addNewItemToData} = require('../controllers/commentsController')

const router = express.Router();


router.use(express.json());

router.get('/comments', getAllData).post('/comments',express.json(),addNewItemToData);

router.get('/comments/:1',getDataById);


router.use((req, res) => {
    res.status(400).json({ error: 'Bad Request' });
});

module.exports = router;