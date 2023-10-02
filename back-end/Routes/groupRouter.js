const express = require('express')
const groupController = require('../controllers/groupController')
const {verify, decode} = require("jsonwebtoken");

const groupRouter = express()



groupRouter.use((req, res, next)=> {
    verify(req.headers?.authorization?.split(' ')[1], 'amirSoska', (err, decode)=> {
        if (err) {
            return req.status(400).json({error: 'Token was not provided'})
            // console.log(err)
        } else {
            req.user_id = decode.user_id;
            next();
        }
    })
})

groupRouter.post('/', groupController.create)
groupRouter.get('/', groupController.getGroups)


module.exports = groupRouter