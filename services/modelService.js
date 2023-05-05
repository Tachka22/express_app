const connectToDb = require('../configs/dataBaseCon');
const { ObjectId } = require('mongodb');

let database =  connectToDb();

async function getDataFromDatabase(collectionName) {
    try {
        const result = await database.collection(collectionName).find({}).toArray();
        return result;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

async function getOneData(id) {
    try {
        const result = await database.collection("models").findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error('Error ', error);
        throw error;
    }
}

async function addNewData(collectionName, data) {
    console.log(collectionName);
    try {
        const result = await database.collection(collectionName).insertOne(data);
        return result;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

module.exports = {
    getDataFromDatabase,
    addNewData,
    getOneData
};