const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt');

module.exports = (app) => {
    app.post('/meditation/register', (req, res) => {
        const userRegister = req.body
        bcrypt.hash(userRegister.password, 10).then(hash => {
            userRegister.password = hash
        })
        return User.create(userRegister).then(user => {
            console.log(user.toJSON())
            return res.json({message: 'user registred ! ', data: user})
        })
    })
}