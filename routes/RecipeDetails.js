const express = require('express')
const router = express.Router()

const { GetRecipeDetails } = require('../controllers/RecipeDetails')

router.route('/v1/recipedetail/:id').get(GetRecipeDetails)

module.exports = router