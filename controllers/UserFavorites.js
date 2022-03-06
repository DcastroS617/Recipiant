const { StatusCodes } = require('http-status-codes')
const NotFoundError = require('../errors/NotFound')
const BadRequestError = require('../errors/BadRequest')
const UserFavorites = require('../models/UserFavorites')
const UserModel = require('../models/User')
const RecipeModel = require('../models/Recipe')

//if a user likes a recipe, the button will be true, if the user
//dislikes a recipe, the button "like" will be false, this can be 
//managed in the front-end side of the app, sending, a true value
//if the user liked the recipe

const UserLikeAndDislike = async (req, res) => {
    let like
    const {
        body: {
            user, recipe
        }
    } = req
    if (user === '' || recipe === '') throw new BadRequestError('Debes introducir la receta y el chef')
    const recipeFound = await RecipeModel.findOne({ _id: recipe })
    const userFound = await UserModel.findOne({ _id: user })
    if (!recipeFound || !userFound) throw new NotFoundError('Los elementos introducidos no se encuentran registrados')
    const likeFound = await UserFavorites.findOne({ user: user, recipe: recipe })
    if (likeFound) {
        like = await UserFavorites.findOneAndUpdate({ _id: likeFound._id }, req.body, {
            new: true,
            runValidators: true,
        })
        console.log('se ejecuto el update de favoritos')
    } else {
        like = await UserFavorites.create(req.body)
        console.log('se ejecuto el insert de favoritos')
    }
    return res.status(StatusCodes.OK).json({ msg: 'user liked', body: like, recipe: recipeFound, user: userFound.name })
}

//send only data that the user liked, dislikes will not be shown, 
//simply validate with an if statement = if(favorites.like === true){}
const getUserLikes = async (req, res) => {  
    let likeCount = 0
    const {
        user: {
            userID
        }
    } = req
    const favorites = await UserFavorites.find({ user: userID })
    if (!favorites) {
        throw new NotFoundError('No has dado like a ninguna receta')
    }
    let recipes = favorites.map((item) => {
        if(item.like === true){
            likeCount++
            return item.recipe
        }
    })
    const recipeFound = await RecipeModel.find({ _id: { $in: recipes } })
    console.log(recipes)
    return res.status(StatusCodes.OK).json({ msg: 'likes personales', favorites: favorites, recipes: recipeFound, likeAmount: likeCount })
}

const userInteractions = async (req, res) => {
    let likeCount = 0, dislikeCount = 0
    const likeFound = {}
    const dislikeFound = {}
    let favorites = await UserFavorites.find({})
    if(!favorites) throw new BadRequestError('no existen registros de interacciones en la base de datos') 
    const likeMap = favorites.map((item) => {
        if(item.like === true) {
            likeCount++
            return item.recipe
        }
    })
    const dislikeMap = favorites.map((item) => {
        if(item.dislike === true) {
            dislikeCount++
            return item.recipe
        }
    })
    likeMap.forEach((item) => {
        if(item !== undefined) likeFound[item] = (likeFound[item] || 0) + 1
    })
    dislikeMap.forEach((item) => {
        if(item !== undefined) dislikeFound[item] = (dislikeFound[item] || 0) + 1
    })
    res.status(StatusCodes.OK).json({msg: "all user interactions", favorites, likeCount, dislikeCount, likeFound, dislikeFound})
}

const wipeout = async (req, res) => {
    await UserFavorites.deleteMany({})
    return res.status(StatusCodes.OK).json({ msg: 'wipeout de favoritos finalizado' })
}

module.exports = {
    UserLikeAndDislike,
    wipeout,
    getUserLikes,
    userInteractions
}