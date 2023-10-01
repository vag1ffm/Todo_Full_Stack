const express = require('express')
const userController = require('../controllers/userController')

const authRouter = express()



authRouter.post('/users', userController.create)
authRouter.post('/token/login', userController.login)


module.exports = authRouter