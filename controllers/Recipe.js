const { StatusCodes } = require("http-status-codes")
const BadRequestError = require("../errors/BadRequest")
const NotFoundError = require('../errors/NotFound')
const Recipe = require('../models/Recipe')

const CreateRecipe = async (req, res) => {
    
    const recipe = await Recipe.create(req.body)
    return res.status(StatusCodes.CREATED).json({ recipe })
}

const FiltrateRecipe = async (req, res) => {
    const {
        query: {
            name, chef, numericFilter, sort, fields
        }
    } = req
    const queryObject = {}
    if (name) { queryObject.name = { $regex: name, $options: 'i' } }
    //when doing search by ObjectId simply use the same config as if it was a static array
    if (chef) { queryObject.chef = chef }
    //if (ingredients) { queryObject.ingredients = { $regex: ingredients, $options: 'i' } }
    if (numericFilter) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilter.replace(regEx,
            (match) => `-${operatorMap[match]}-`)
        const options = ['level']
        filters = filters.split(',').forEach(element => {
            const [field, operator, value] = element.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }
    let result = Recipe.find(queryObject)

    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }
    //needs pagination in front-end
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 100
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)

    let recipe = await result
    if (!recipe) {
        throw new NotFoundError('La receta no se encuentra en el inventario de recetas')
    }
    //console.log(recipe)
    
    console.log(recipe)
    
    /*recipe.forEach(item => {
        item.ingredients = item.ingredients.join(', ')
    })*/
    /*let ingredients = recipe.ingredients
    ingredients = ingredients.join(', ')
    recipe.ingredients = ingredients*/
    //recipe.ingredients = recipe.ingredients.join(', ')
    return res.status(StatusCodes.OK).json({ recipe })
}

const GetRecipeById = async (req, res) => {
    const {
        params: {
            id: RecipeID
        }
    } = req
    const recipe = await Recipe.findById({_id: RecipeID}).select('-__v')
    if(!recipe) throw new NotFoundError('La receta no se encuentra en el inventario de recetas')
    return res.status(StatusCodes.OK).json({recipe})
}

const EditRecipe = async (req, res) => {
    const {
        params: {
            id: RecipeID
        },
        body: {
            name, ingredients, chef, level, steps
        }
    } = req
    if (name === '' || ingredients === '' || chef === '' || level === '' || steps === '') {
        throw new BadRequestError('Debes introducir los datos para poder editar la receta')
    }
    const recipe = await Recipe.findOneAndUpdate({ _id: RecipeID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!recipe) {
        throw new NotFoundError('La receta no se encuentra en el inventario de recetas')
    }
    return res.status(StatusCodes.OK).json({ recipe })
}

const DeleteRecipe = async (req, res) => {
    const {
        params: {
            id: RecipeID
        }
    } = req
    const recipe = await Recipe.findOneAndDelete({ _id: RecipeID })
    if (!recipe) {
        throw new NotFoundError('La receta no se encuentra en el inventario de recetas')
    }
    return res.status(StatusCodes.OK).json({ recipe })
}

const wipeout = async (req, res) => {
    await Recipe.deleteMany({})
    return res.status(StatusCodes.OK).json({ msg: "wipeout de recetas finalizado" })
}

module.exports = {
    CreateRecipe,
    FiltrateRecipe,
    EditRecipe,
    DeleteRecipe,
    GetRecipeById,
    wipeout
}
