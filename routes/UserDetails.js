const express = require('express')
const router = express.Router()

const { GetUserDetails } = require('../controllers/UserDetails')
router.route('/v1/userdetail/:id').get(GetUserDetails)

module.exports = router