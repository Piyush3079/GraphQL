import Sequelize from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

const dataBase = process.env.DATABASE;
const userName = process.env.USERNAME;
const passWord = process.env.PASSWORD;
console.log(dataBase, userName, passWord);

const conn = new Sequelize(
    dataBase, 
    'root', 
    passWord,
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    })

conn.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default conn;