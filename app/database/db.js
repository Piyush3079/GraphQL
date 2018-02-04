import Sequelise from 'sequelise';
require('dotenv').config();
import _ from 'lodash';
import Faker from 'faker';

const conn = new Sequelise({
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
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