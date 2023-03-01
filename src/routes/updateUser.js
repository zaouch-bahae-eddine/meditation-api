const { User } = require('../db/sequelize')
const { UniqueConstraintError } = require('sequelize')
const { application } = require('express')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.put('/meditation/users/:id', auth, (req, res)=>{
        const userId = req.params.id
        User.update(req.body, {
            where: {id : userId}
        }).then(async function () {
            const userUpdated = await User.findByPk(userId)
            const message = ` user with id = ${userUpdated.id} updated !`
            res.json({message, data: userUpdated})
        })
        .catch(err => {
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