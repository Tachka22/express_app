const connectToMongoDB = require('../configs/dataBaseCon');

async function getDataFromDatabase() {
    const database = await connectToMongoDB;
    const collection = database.collection('comments1');
    try {
        const result = await collection.find({}).toArray();
        return result;
    } catch (error) {
        console.error('Error  getDataFromDatabase', error);
        com
        throw error;
    }
}

async function getOneData(id) {
    const database = connectToMongoDB();
    const collection = database.collection('comments1'); 

    try {
        const result = await collection.findOne({ _id: id });
        return result;
    } catch (error) {
        console.error('Error getOneDat', error);
        throw error;
    }
}

async function addNewData(data) {
    const database = connectToMongoDB();
    const collection = database.collection('comments1'); 

    try {
        const result = await collection.insertOne(data);
        return result;
    } catch (error) {
        console.error('Error addNewData', error);
        throw error;
    }
}

module.exports = {
    getDataFromDatabase,
    getOneData,
    addNewData,
};