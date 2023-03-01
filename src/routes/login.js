const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
module.exports = (app) => {
    app.post('/meditation/login', (req, res)=>{
        const emailCnx = req.body.email
        User.findOne({
            where: { email: emailCnx }
        }).then(user => {

            if(!user){
                const message = `User with email ='${emailCnx}' not found`
                return res.status(404).json({message})
            }

            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if(!isPasswordValid){
                    const message = `incorrecte password given !`
                    return res.status(401).json({message})
                }
                //JWT
                const token = jwt.sign(
                    { userId: user.id },
                    privateKey,
                    { expiresIn: '24h'}
                )
                
                const message = `User connected !`
                delete user.password
                return res.json({message, data: user, token})
            })
        }).catch(error => {
            const message = `Server issue, retry i nmoment !`
            return res.status(500).json(message)
        })
    })
}