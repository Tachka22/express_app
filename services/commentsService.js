const connectToDb = require('../configs/dataBaseCon');
const { ObjectId } = require('mongodb');

let database =  connectToDb();
const collection = database.collection('comments1');


async function getDataFromDatabase() {
    try {
        const result = await collection.find({}).toArray();
        return result;
    } catch (error) {
        console.error('Error getDataFromDatabase', error);
        throw error;
    }
}
async function getOneData(id) {
    try {
        
        const result = await collection.findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error('Error getOneDat', error);
        throw error;
    }
}

async function addNewData(data) {
    console.log(collection);
    await collection.insertOne(data);
}

module.exports = {
    getDataFromDatabase,
    getOneData,
    addNewData,
};