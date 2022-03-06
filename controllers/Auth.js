const { StatusCodes } = require('http-status-codes')
const BadRequestError = require('../errors/BadRequest')
const UnauthorizedError = require('../errors/Unauthorized')
const User = require('../models/User')

const Register = async (req, res) => {
    const {
        body: {
            email, password, name
        }
    } = req
    const newUser = await User.create({ name, email, password })
    const token = newUser.CreateJWT()
    return res.status(StatusCodes.CREATED).json({ msg: 'welcome!', user: { email: newUser.email, name: newUser.name }, token })
}

const Login = async (req, res) => {
    const {
        body: {
            email, password
        }
    } = req
    if (email === "" || password === "") {
        throw new BadRequestError('debe introducir los credenciales para iniciar sesión')
    }
    console.log(email, password)
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new UnauthorizedError('El email no se encuentra registrado')
    }
    const comparePass = await user.CompareContrasena(password)
    if (!comparePass) {
        throw new UnauthorizedError('la contraseña es incorrecta')
    }
    const token = user.CreateJWT()
    return res.status(StatusCodes.OK).json({ msg: 'hey frodo', userEmail: email,userID: user._id, token })
}

const wipeout = async (req, res) => {
    await User.deleteMany({})
    return res.status(StatusCodes.OK).json({ msg: 'wipeout de mongo terminado' })
}

module.exports = {
    Register,
    Login,
    wipeout
}