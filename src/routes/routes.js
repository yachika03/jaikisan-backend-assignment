const express = require('express')
const router = express.Router()
const { createUser, fetchUser, removeUser } = require('../Controllers/userController')
const { createCard, fetchCard } = require('../Controllers/cardController')


router.post('/createUser', createUser)
router.get('/getUser', fetchUser)
router.delete('/deleteUser/:ID', removeUser)


router.post('/createCard', createCard)
router.get('/getCard', fetchCard)



module.exports = router