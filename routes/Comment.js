const express = require('express')
const router = express.Router()

const { GetRecipeComment, CreateComment, EditComment, DeleteComment } = require('../controllers/Comment')

router.route('/v1/comment').get(GetRecipeComment).post(CreateComment)
router.route('/v1/comment/:id').put(EditComment).delete(DeleteComment)

module.exports = router