const connectToDb = require('../configs/dataBaseCon');
const { ObjectId } = require('mongodb');

let database =  connectToDb();

async function getDataFromDatabase(collectionName) {
    try {
        const result = await database.collection(collectionName).find({}, {projection: {name: 1}}).toArray();
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
    try {
        const result = await database.collection(collectionName).insertOne(data);
        return result;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

async function deleteDate(collectionName, id) {
    try {
        const result = await database.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
        return  result;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

async function updateData(collectionName,ID, date){
    
    try{
        const result = await database.collection(collectionName).findOneAndUpdate({ _id: new ObjectId(ID) },{ $set: {DateUpdated:date}});
        return result;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}


module.exports = {
    getDataFromDatabase,
    addNewData,
    getOneData,
    deleteDate,
    updateData
};