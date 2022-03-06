const mongoose = require('mongoose')
const defaultImage = "https://res.cloudinary.com/dzyo30by6/image/upload/v1643078521/cuvoe0rx5gww23fsrhpj.jpg"
const RecipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "debe introducir el nombre de la receta"],
        maxlength: 105
    },
    ingredients: {
        type: Array,
        required: [true, 'debes introducir los ingredientes de la receta']       
    },
    chef: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'debes introducir el usuario creador de la receta']
    },
    steps: {
        type: String,
        required: [true, 'debes introducir los pasos de la receta']
    },
    level: {
        type: Number,
        required: [true, "debes introducir la dificultad de la receta"],
        default: 3.5
    },
    image: {
        type: String,
        default: defaultImage
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Recipe', RecipeSchema)