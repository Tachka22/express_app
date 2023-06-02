const { deleteAPIkey,createAPIkey, getAPIkey, getName} = require('../services/apiService');
const { ObjectId } = require("mongodb");
const randtoken = require('rand-token');
const { BadRequest } = require('../utils/errors');


async function createKey(req, res,next) {
    const {name} = req.body;
    var token = randtoken.generate(32);
    try {
        if(!name){
            const error = new BadRequest('Invalid name');
            next(error);
        }
        else{
            const result = await createAPIkey({name, token});
            console.log(result);
            res.json(result);
        }
    } catch (error) {
        next(error);
    }
}
async function checkKey(req, res,next){
    const api = req.headers.api;
    const {name} = req.body;
    api.toString();
    console.log("Ключ из заголовка: " +api.toString());
    try {
        //получили токен по имени
        const result = await getAPIkey(name);
        const {token} = result;
        console.log("ответ из бд:");
        console.log(JSON.parse(JSON.stringify(result)));

        console.log("токен из бд: " + token);
        if (api === token){
            console.log("success authorization");
            next();
        }
        else{
            console.log("bad");
            const error = new Error("No authorization");
            error();
        }
    } catch (error) {
        res.status(403).json({ error: 'No authorized' });
    }
}

async function deleteKey(req,res,next){
    const api = req.headers.api;
    try {
        if(!api){
            next(new BadRequest('Invalid APIkey'));
        }
        else{
            await deleteAPIkey(api);
            next();
        }
    } catch (error) {
        next(error);
    }
}
module.exports ={createKey, checkKey,deleteKey};