const CommentModel = require('../models/Comments')
const RecipeModel = require('../models/Recipe')
const { StatusCodes } = require('http-status-codes')
const NotFoundError = require('../errors/NotFound')
const GetRecipeDetails = async (req, res) => {
    const {
        params:{
            id
        }
    } = req
    const recipe = await RecipeModel.findById({ _id: id})
    const comments = await CommentModel.find({recipe: id})
    if(!recipe) throw new NotFoundError("No encontramos la receta")
    res.status(StatusCodes.OK).json({ recipe, comments})
}

module.exports = {
    GetRecipeDetails
}