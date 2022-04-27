const express = require('express')
const router = express.Router()
const auth = require('../middleware/authentication')
const UploadImage = require('../middleware/Image')

const {CreateRecipe, FiltrateRecipe, wipeout, EditRecipe, DeleteRecipe, GetRecipeById} = require('../controllers/Recipe')

router.route('/v1/recipe').post([auth, UploadImage], CreateRecipe).get(FiltrateRecipe)
router.route('/v1/recipe/:id').delete(auth, DeleteRecipe).put([auth, UploadImage], EditRecipe).get(GetRecipeById)
router.route('/v1/recipe/wipeout').delete(wipeout)

module.exports = router