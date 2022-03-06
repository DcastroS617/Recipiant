require('dotenv')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const defaultImage = 'https://res.cloudinary.com/dzyo30by6/image/upload/v1644007253/argubc231mvu6vcqksmd.jpg'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'introduce tu primer nombre'],
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Debes introducir tu email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'debes proveer un email valido',],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Debes introducir la contraseña'],
        minlength: 8
    },
    image: {
        type: String,
        default: defaultImage
    }
})

UserSchema.pre('save', async function (next) {
    const saltPass = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, saltPass)
    next()
})

UserSchema.methods.CreateJWT = function () {
    return jwt.sign({ email: this.name, id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

UserSchema.methods.CompareContrasena = function (contrasena) {
    const esContra = bcrypt.compare(contrasena, this.password)
    return esContra
}

module.exports = mongoose.model('User', UserSchema)