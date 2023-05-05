const { getDataFromDatabase,
        addNewData,
        getOneData} = require('../services/modelService');

async function getModels(req, res) {
    try {
        const result = await getDataFromDatabase("models");
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error getAllData' });
    }
}

async function getModelByID(req, res) {
    try {
        const result = await getOneData(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: 'Not Found' });
    }
}

async function addNewItemModel(req, res) {
    const dataCreated = new Date();
    const {name, model_name,type_of_model,object_model,description,comments } = req.body;
    try {
        await addNewData("models",{name, model_name,type_of_model,object_model,description,comments, dataCreated});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {addNewItemModel,getModels,getModelByID};