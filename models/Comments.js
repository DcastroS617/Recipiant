const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'Debe introducir un comentario para guardarlo!'],
        maxlength: 550
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe iniciar sesion para comentar']
    },
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe',
        required: [true, 'Error interno, intentelo de nuevo']
    },
    likes: {
        type: Number,
        default: 0
    }
    //analizar las posibilidades de un sistema de respuesta para los comentarios
    //problablemente puede ser un sistema anidado, u otro modelo; Es porque necesitamos
    //el usuario que hizo la respuesta los likes y ya, solo se puede ir un nivel 
    //en el arbol json, para evitar conflictos con mongo
})

module.exports = mongoose.model("Comment", CommentSchema)