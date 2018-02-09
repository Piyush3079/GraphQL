import Sequelize from 'sequelize';
import conn from './conn';
import _ from 'lodash';
import Faker from 'faker';




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