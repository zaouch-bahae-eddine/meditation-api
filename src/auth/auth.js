const jwt = require('jsonwebtoken')
const privateKey = require('./private_key')
  
const authMideleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
   
    const token = extractBearerToken(authorizationHeader)
    if(!authorizationHeader) {
        const message = `Request header dosn't containt a connection token !`
        return res.status(401).json({ message })
    }

    /* Verification du token */
    jwt.verify(token, privateKey, (error, decodedToken) => {
        if(error) {
            const message = `Access denied !`
            return res.status(401).json({ message, data: error })
        }
        //Verification que le userId du body est le meme dans le token
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            const message = `L'identifiant de l'utilisateur est invalide.`
            return res.status(401).json({ message })
        } else {
            next()
        }
    })
}
/* Récupération du header bearer */
const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}
/* DecodedToke */
const decodedToken = (token) => {
    return jwt.decode(extractBearerToken(token))
}
module.exports = {decodedToken: decodedToken, authMideleware: authMideleware}