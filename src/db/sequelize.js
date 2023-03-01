const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(
    'meditation',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
)

const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    console.log('La base de donnée a bien été initialisée !')
    bcrypt.hash('123', 10).then(hash => {
      User.create({
        email: 'user@gmail.com',
        password: hash
      }).then(user => console.log(user.toJSON()))
    })
  })
}
  
module.exports = { 
  initDb, User
}