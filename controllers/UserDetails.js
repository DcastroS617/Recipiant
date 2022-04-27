const UserModel = require('../models/User')
const RecipeModel = require('../models/Recipe')
const FavoriteModel = require('../models/UserFavorites')
const { StatusCodes } = require('http-status-codes')
const NotFoundError = require('../errors/NotFound')

const GetUserDetails = async(req, res) => {
    const{
        params:{
            id
        }
    } = req
    const user = await UserModel.findById({_id: id}).select('-__v -password')
    const recipes = await RecipeModel.find({ chef: id})
    const recipeFound = await FavoriteModel.find({user: id})
    const favorites = await RecipeModel.find({ _id: { $in: recipes } })

    if(!user) throw new NotFoundError("el usuario no se encuentra registrado...")
    return res.status(StatusCodes.OK).json({ user, recipes, favorites})
}

module.exports = {
    GetUserDetails
}