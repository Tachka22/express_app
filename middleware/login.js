const { getName } = require('../services/apiService');
const { getDataFromDatabase,
    addNewData,
    getOneData,
    deleteDate,
    updateData } = require('../services/modelService');
const { NotFound, Unauthorized } = require('../utils/errors');

async function checkLogin(req, res, next) {


    try {
        //получили api из заголовка
        const api = req.headers.api;
        api.toString();
        if (!api) {
            next(new BadRequest("Invalid API"))
        } else {
            //получили имя по токену из коллекции ключей
            const data1 = await getName(api);
            const nameFromApi = data1['name'];
            console.log("имя по api из БД ключей:" + nameFromApi);
            if (nameFromApi === 'undefined') {
                const error = new Error(`Invalid name`);
                next(error);
            }
            //получили имя из коллекции моделей
            const id = req.params.id;
            const data2 = await getOneData(id);
            const nameFromModelCol = data2['name'];
            console.log("имя по id из коллекции моделей" + nameFromModelCol);
            if (nameFromModelCol === 'undefined') {
                const error = new Error(`Invalid name`);
                next(error);
            } else {
                //сверяем
                if (nameFromApi === nameFromModelCol) {
                    console.log("success authorization");
                    next();
                }
                else {
                    console.log("bad");
                    const error = new Unauthorized("unauthorized");
                    next(error);
                }
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { checkLogin };