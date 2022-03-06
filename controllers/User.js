const UserModel = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const bcryptjs = require('bcryptjs')
const NotFoundError = require('../errors/NotFound')
const BadRequestError = require('../errors/BadRequest')

const GetUserById = async (req, res) => {
    const{id} = req.params
    const userFound = await UserModel.findById({_id: id}).select('-password -__v')
    if(!userFound) throw new NotFoundError('el usuario no se encuentra registrado.')
    return res.status(StatusCodes.OK).json({msg: 'el usuario se encuentra registrado', userFound})
}
const CambiarPassword = async (req, res) => {
    const{
        body: {
            email: UserEmail,
            password: Password
        }
    } = req
    if(Password.length <= 8){
        throw new BadRequestError('la contraseña debe ser mayor a 8 caracteres')
    }
    let salt = await bcryptjs.genSalt(10)
    let newPass = await bcryptjs.hash(Password, salt)
    const userFound = await UserModel.findOne({email: UserEmail})   
    if(!userFound){
        throw new NotFoundError('el usuario no se encuentra registrado')
    }
    const user = await UserModel.findOneAndUpdate({email: UserEmail}, {password: newPass}, {
        new: true,
        runValidators: true
    })
    return res.status(StatusCodes.OK).json({msg:'cambiamos la contraseña :D', user})
}
module.exports = {
    GetUserById,
    CambiarPassword
}