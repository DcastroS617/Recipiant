const express = require('express')
const router = express.Router()

const {GetUserById, CambiarPassword, GetUsers} = require('../controllers/User')

router.route('/v1/user').get(GetUsers)
router.route('/v1/user/:id').get(GetUserById)
router.route('/v1/user/password').put(CambiarPassword)

module.exports = router