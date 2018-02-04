import Sequelise from 'sequelise';
import dotenv from 'dotenv';
import _ from 'lodash';
import Faker from 'faker';

dotenv.config();

const conn = new Sequelise({
    process.env.DATABASE , 
    process.env.USERNAME , 
    process.env.PASSWORD , 
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
})

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Person = conn.define('person', {
    firstName: {
        type: Sequelise.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelise.STRING,
        allowNull: false
    },
    email: {
        type: Sequelise.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

const Post = conn.define('post', {
    title: {
        type: Sequelise. STRING,
        allowNull: false
    },
    content: {
        type: Sequelise.STRING,
        allowNull: false
    }
})

Person.hasMany(Post);
Post.belongsTo(Person);

conn.sync({force: true})
.then(() =>{
    _.times(10000, ()=> {
        return Person.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email()
        })
    })
})

export default conn;