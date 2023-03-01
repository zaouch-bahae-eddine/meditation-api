const jwt = require('jsonwebtoken')
const privateKey = require('./private_key')
  
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  
    if(!authorizationHeader) {
        const message = `Request header dosn't containt a connection token !`
        return res.status(401).json({ message })
    }
    
    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if(error) {
            const message = `Access denied !`
            return res.status(401).json({ message, data: error })
        }

        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            const message = `L'identifiant de l'utilisateur est invalide.`
            res.status(401).json({ message })
        } else {
            next()
        }
    })
}