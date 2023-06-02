const connectToDb = require('../configs/dataBaseCon');
const { ObjectId } = require('mongodb');

let database =  connectToDb();
collectionApiKeys = database.collection("APIkeys")

async function deleteAPIkey(APIKEY) {
    try{
        const result = await collectionApiKeys.findOneAndDelete({"key":APIKEY});
        return  result;
    }
    catch(error){
        throw error;
    }
}

async function createAPIkey(data){
    try{
        await collectionApiKeys.insertOne(data);
    }
    catch(error){
        throw error;
    }
}
async function getAPIkey(username){
    console.log(username);
    try{
        const result = await collectionApiKeys.findOne({'name':username}, {projection: {token:1}});
        return result;
        
    }
    catch(error){
        throw   error;
    }
}
async function getName(apikey){
    //console.log("api key: " + apikey);
    try{
        const result = await collectionApiKeys.findOne({'token':apikey}, {projection: {name:1}});
        return result;
        
    }
    catch(error){
        throw   error;
    }
}

module.exports = { deleteAPIkey,createAPIkey, getAPIkey,getName};