const { getDataFromDatabase, getOneData, addNewData } = require('../services/commentsService');

async function getAllData(req, res) {
    try {
        const data = await getDataFromDatabase();
        res.json(data);
    } catch (error) {
        console.error('Error data', error);
        res.status(500).json({ error: 'Internal Server Error getAllData' });
    }
}


async function getDataById(req, res) {
    const id = req.params.id;
    try {
        const data = await getOneData(id);
        res.json(data);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error: 'Internal Server Error getDataById' });
    }
}


async function addNewItemToData(req, res) {
    const data = req.body;
    try {
        const result = await addNewData(data);
        res.json(result);
    } catch (error) {
        console.error('Error adding data', error);
        res.status(500).json({ error: 'Internal Server Error addNewItemToData' });
    }
}

module.exports = {
    getAllData,
    getDataById,
    addNewItemToData,
};