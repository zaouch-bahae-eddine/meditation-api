const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt');
const MeditationTimeModel = require('../models/meditationTime');

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
const MeditationTime = MeditationTimeModel(sequelize, DataTypes)
//User have Many MeditationTime - MeditationTime belongs to One User
User.hasMany(MeditationTime)
MeditationTime.belongsTo(User)

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
  initDb, User, MeditationTime
}