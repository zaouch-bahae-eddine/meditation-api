const { User } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/meditation/users/:id', auth.authMideleware, (req, res)=>{
        User.findByPk(req.params.id).then(user => {
            const message = `User with id = ${user.id} finded !`
            res.json({message, data: user})
        })
    })
}