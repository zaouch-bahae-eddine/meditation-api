const { User } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.delete('/meditation/users/:id', auth.authMideleware, (req, res)=>{
        const userId = req.params.id
        User.findByPk(userId).then(userDeleted => {
            const message = ` user with id = ${userDeleted.id} deleted !`
            User.destroy({
                where: {id : userId}
            }).then( _ => res.json({message, data: userDeleted}))
        })
    })
}