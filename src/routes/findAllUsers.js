const { User } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/meditation/users', auth, (req, res)=>{
        if(req.query.email){
            const email = req.query.email
            const limit = parseInt(req.query.limit) || 1
            return User.findAndCountAll(
                {
                    where: {
                        email: {
                            [Op.like]: `%${email}%`
                        }
                    },
                    limit: limit,
                    order: ['email']
                }
            ).then(({count, rows }) => {
                const message = `${count} users finded via keyword "${email}"`
                res.json({message, data: rows})
            })
        }
        User.findAll({order:['email']}).then(users => {
            const message = `Users finded !`
            res.json({message, data: users})
        })
    })
}