const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);
//Подключение к бд и возвращения объекта базы данных

function connectToMongoDB() {
    return new Promise((resolve, reject) => {
    client.connect((error) => {
        if (error) {
            console.error('Error connecting to MongoDB', error);
            reject(error);
        } else {
            console.log('Connected to MongoDB');
          // Получение объекта базы данных
            const data = client.db('sapr_labs'); 
            resolve(data);
        }
        });
    });
}

module.exports = connectToMongoDB;