const express = require('express');

const modelsController = require('../controllers/modelController')
const apikeysController = require('../controllers/apikeysCon')
const middleLogin = require('../middleware/login');
const middleError = require('../middleware/error');
const router = express.Router();

router.use(express.json());

router.post('/api/', apikeysController.createKey);
router.delete('/api/', apikeysController.deleteKey);

router.get('/models',modelsController.getModels);
    
router.get('/models/:id', modelsController.getModelByID);


router.post('/models',express.json(), modelsController.addNewItemModel);

router.put('/models/:id',express.json(),middleLogin.checkLogin, modelsController.updateModelById);

router.delete('/models/:id',middleLogin.checkLogin,modelsController.deleteModelByID, apikeysController.deleteKey);

router.use(middleError.handleErrors);

router.use((req, res) => {
    res.status(400).json({ error: 'Bad Request' });
});


module.exports = router;