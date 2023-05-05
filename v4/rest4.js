const express = require('express');

const modelsController = require('../controllers/modelController')

const router = express.Router();


router.use(express.json());

router.get('/models',modelsController.getModels);

router.get('/models/:id', modelsController.getModelByID);


router.post('/models',express.json(),modelsController.addNewItemModel);

router.put('/models/:id');

router.delete('/models/:id');


router.use((req, res) => {
    res.status(400).json({ error: 'Bad Request' });
});

module.exports = router;