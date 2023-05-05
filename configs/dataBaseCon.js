const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017'; 
const client = new MongoClient(uri);

function connectToDb (){
    client.connect();
    console.log('Connected...');
    const db = client.db('sapr_labs'); 
    return db;
}
db = connectToDb()

console.log(db);


//Подключение к бд и возвращения объекта базы данных

// function connectToDb() {
//     return new Promise((resolve, reject) => {
//     client.connect((error) => {
//         if (error) {
//             console.error('Error connecting to MongoDB', error);
//             reject(error);
//         } else {
//             console.log('Connected to MongoDB');
//           // Получение объекта базы данных
//             const data = client.db('sapr_labs'); 
//             resolve(data);
//         }
//         });
//     });
// }

module.exports = connectToDb;