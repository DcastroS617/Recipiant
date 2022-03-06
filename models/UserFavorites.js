const mongoose = require('mongoose')
const UserFavoritesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'debe introducir el id del usuario']
    },
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe',
        required: [true, 'debes introducir la receta']
    },
    like: {
        type: Boolean,
        required: [true, 'debe introducir la validacion del boton']
    },
    dislike: {
        type: Boolean,
        required: [true, 'debes introducir la validacion del boton']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('UserFavorites', UserFavoritesSchema)