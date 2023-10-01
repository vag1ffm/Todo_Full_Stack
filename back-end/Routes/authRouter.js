const express = require('express')
const userController = require('../controllers/userController')
const {verify, decode} = require("jsonwebtoken");

const authRouter = express()



authRouter.use((req, res, next)=> {
    verify(req.headers?.authorization?.split(' ')[1], 'amirSoska', (err, decode)=> {
        if (err) {
            next();
        } else {
            req.id = decode.user_id;
            next();
        }
    })
})

authRouter.post('/users', userController.create)
authRouter.post('/token/login', userController.login)
authRouter.post('/token/logout', userController.logout)
authRouter.get('/users/me', userController.getUserInfo)


module.exports = authRouter