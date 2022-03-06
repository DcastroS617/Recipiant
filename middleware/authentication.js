const User = require('../models/User')
const jwt = require('jsonwebtoken')
const UnauthorizedError = require('../errors/Unauthorized')

const auth = async (req, res, next) => {
    //check for authorization header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthorizedError('se necesita que provea una llave de usuario para continuar')
    }
    const token = authHeader.split(' ')[1]
    try{
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {email: payload.email, userID: payload.id,}
    next()
    }catch(error){
        throw new UnauthorizedError('el usuario es invalido')
    }
}

module.exports = auth