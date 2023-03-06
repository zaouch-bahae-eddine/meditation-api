const { User } = require('../../db/sequelize')
const auth = require('../../auth/auth')
const { UniqueConstraintError } = require('sequelize')

module.exports = (app) => {
    app.post('/meditation/users', auth.authMideleware, (req, res)=>{
        User.create(req.body).then(user => {
            const message = `User with id = ${user.id} created !`
            res.json({message, data: user})
        }).catch(err => {
            if(err instanceof UniqueConstraintError){
                const message = 'Email already used !'
                return res.status(400).json({
                    message,
                    data: err 
                })
            }
        })
    })
}