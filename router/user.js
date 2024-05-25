const router = require('express').Router()

const controlerUserr = require('../controler/user')
// const authorizationMidelware = require('../midelware/authorization.midelware')

router.post('/register', controlerUserr.register)
router.post('/login', controlerUserr.login)
router.get('/profile', controlerUserr.profile)

module.exports = router