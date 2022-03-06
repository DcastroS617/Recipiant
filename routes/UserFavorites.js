const express = require('express')
const router = express.Router()

const {wipeout, UserLikeAndDislike, getUserLikes, userInteractions} = require('../controllers/UserFavorites')

router.route('/v1/favorites').post(UserLikeAndDislike).get(getUserLikes)
router.route('/v1/favorites/analytics').get(userInteractions)
router.route('/v1/like/wipeout').delete(wipeout)

module.exports = router