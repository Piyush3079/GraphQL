import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import _ from 'lodash';
import Faker from 'faker';

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

const Person = conn.define('person', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

const Post = conn.define('post', {
    title: {
        type: Sequelize. STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Person.hasMany(Post);
Post.belongsTo(Person);

/*conn.sync({force: true})
.then(() =>{
    _.times(500, ()=> {
        return Person.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email()
        }).then(person => {
            return person.createPost({
                title: `This is a sample post created by ${person.firstName} ${person.lastName}`,
                content: 'This is a sample article'
            })
        })
    })
})*/

export default conn;