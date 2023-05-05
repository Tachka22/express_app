const { getDataFromDatabase, getOneData, addNewData } = require('../services/commentsService');
async function getAllData(req, res) {
    try {
        const result = await getDataFromDatabase();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error getAllData' });
    }
}


async function getDataById(req, res) {
    try {
        const result = await getOneData(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: 'Not Found' });
    }
}

function validateInput(req, res, next) {
    const body = req.body;
    if(body['name','text'] == undefined){
        return res.status(400).json({ error: 'Invalid input' });
    }
    else{
        next();
    }
}

async function addNewItemToData(req, res) {
    const dataCreated = new Date();
    const { name, text } = req.body;
    try {
        await addNewData({name, text, dataCreated});
        let result = await getDataFromDatabase();
        res.json(result);
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error addNewItemToData' });
    }
}

module.exports = {
    getAllData,
    getDataById,
    addNewItemToData,
    validateInput
};