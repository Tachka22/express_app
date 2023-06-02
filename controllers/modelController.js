const { getDataFromDatabase,
    addNewData,
    getOneData,
    deleteDate,
    updateData } = require('../services/modelService');
const { getName } = require('../services/apiService');
const { ObjectId } = require("mongodb");
const { BadRequest } = require('../utils/errors');

//post с параметром - проверяем APIKEY в заголовке если успешно то продолжаем, всё эо через middleware

async function getModels(req, res) {
    try {
        const result = await getDataFromDatabase("models");
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error getAllData' });
    }
}

async function getModelByID(req, res, next) {
    const idModel = req.params.id;
    if (idModel === undefined) {
        next(new BadRequest('invalid id'));
    }
    try {
        const result = await getOneData(idModel);
        res.json(result);
        next();
    } catch (error) {
        res.status(404).json({ error: 'Not Found' });
        next(error);
    }
}

async function addNewItemModel(req, res) {
    //берём имя по токену из коллекции ключей и добавляем его в post запрос
    try {
        const apiKey = req.headers.api;
        const data = await getName(apiKey);
        const { name } = data;
        const dataCreated = new Date();
        const { model_name, type_of_model, object_model, description, comments } = req.body;
        if (name === undefined) {
            next(new NotFound("Not Found name"));
        }
        else if (!apiKey) {
            next(new BadRequest("Invalid API"));
        }
        else {
            await addNewData("models", { name, model_name, type_of_model, object_model, description, comments, dataCreated });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        next(error);
    }
}

async function deleteModelByID(req, res, next) {
    const id = req.params.id;
    try {
        if (!id) {
            next(new BadRequest("Invalid id"));
        }
        else {
            await deleteDate("models", id);
            next();
        }
    } catch (error) {
        res.status(404).json({ error: 'Not Found' });
        next(error);
    }
}
async function updateModelById(req, res, next) {
    const idModel = req.params.id;
    const dateUpdate = new Date();
    try {
        if(!idModel) {
            next(new BadRequest("Invalid id"));
        }else{
            const result = await updateData('models', idModel, dateUpdate);
            res.json(result);
            next();
        }
    }
    catch (error) {
        next(error);
    }
}


module.exports = { addNewItemModel, getModels, getModelByID, deleteModelByID, updateModelById };