const { StatusCodes } = require('http-status-codes')
const BadRequestError = require('../errors/BadRequest')
const NotFoundError = require('../errors/NotFound')
const CommentModel = require('../models/Comments')

const CreateComment = async (req, res) => {
    const comment = await CommentModel.create(req.body)
    return res.status(StatusCodes.CREATED).json({ msg: 'created!', comment })
}

const EditComment = async (req, res) => {
    const {
        params: {
            id: id
        },
        body: {
            comment: comment
        }
    } = req
    if (id === undefined || comment === undefined) {
        throw new BadRequestError('error interno')
    }
    const Comment = await CommentModel.findOneAndUpdate({ _id: id }, {comment}, {
        new: true,
        runValidators: true
    })
    if (!Comment) {
        throw new NotFoundError('El comentario no se encuentra en los registros')
    }
    return res.status(StatusCodes.OK).json({ msg: "hello", Comment })
}

const DeleteComment = async (req, res) => {
    const comment = await CommentModel.findOneAndDelete({_id : req.params.id})
    if(!comment) throw new NotFoundError('No se encuentra el comentario en los registros')
    return res.status(StatusCodes.OK).json({ msg: "deleted!", comment })
}

const GetRecipeComment = async (req, res) => {
    //regla interna, debe de contener el id de la receta en el
    //query string Ej comment?recipe=objectid
    const {
        query: {
            recipe
        }
    } = req
    let comments = await CommentModel.find({ recipe: recipe })
    if (!comments) throw new NotFoundError('La receta no contiene comentarios')
    return res.status(StatusCodes.OK).json({ msg: 'comments from this recipe', comments })
}

module.exports = {
    CreateComment,
    EditComment,
    DeleteComment,
    GetRecipeComment
}