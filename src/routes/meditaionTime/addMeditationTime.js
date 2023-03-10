const { ValidationError, ValidationErrorItem, SequelizeValidationError } = require('sequelize')
const auth = require('../../auth/auth')
const {MeditationTime} = require('../../db/sequelize')

module.exports = (app) => {
    app.put('/meditation/durations', auth.authMideleware, (req, res)=>{
        const userId = auth.decodedToken(req.headers.authorization).userId
        
        MeditationTime.findOne({
            where: {
                userId: userId,
                date: new Date().toISOString().slice(0, 19).split('T')[0] + 'T00:00:00.000Z'
            }
        }).then(meditation => {
            // Meditation for the first Time in new Date()
            if(meditation === null){
                MeditationTime.create({
                    UserId: userId,
                    date: new Date().toISOString().slice(0, 19).split('T')[0] ,
                    duration: req.body.duration
                }).then(meditation => {
                    const message = 'Meditation created !'
                    return res.json({message, data: meditation})
                }).catch(e => {
                    return res.status(403).json(e.errors)
                })
            } else {
                // Update duration of meditation in the same day
                meditation.duration += req.body.duration
                MeditationTime.update({
                    duration: meditation.duration
                }, { where: { id: meditation.id} }
                ).then(meditationId => {
                    const message = 'Meditation updated !'
                    return res.json({message, data: meditation})
                }).catch(e => {
                    return res.status(403).json(e.errors)
                })
            }
            
        }).catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'server failed excute your action, please retry in second !'
            })
        })
    })
}