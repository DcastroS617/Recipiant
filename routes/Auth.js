const express = require('express')
const router = express.Router()

const { Login, Register, wipeout } = require('../controllers/Auth')
const UploadImage = require('../middleware/Image')
router.route('/v1/login').post(Login)
router.route('/v1/register').post(UploadImage, Register)
router.route('/v1/wipeout').delete(wipeout)

module.exports = router