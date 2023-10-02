const express = require('express')
const todoController = require('../controllers/todoController')
const {decode, verify} = require("jsonwebtoken");

const todoRouter = express()

todoRouter.use((req, res, next) => {
    verify(req.headers?.authorization?.split(' ')[1], 'amirSoska', (err, decode)=>{
        if (err) {
            return res.status(400).json({error: 'Token was not provided'})
        } else {
            req.user_id = decode.user_id;
            next();
        }
    })
})


todoRouter.get('/', todoController.getTodos)
todoRouter.post('/', todoController.create)
todoRouter.put('/:id', todoController.change)


module.exports = todoRouter