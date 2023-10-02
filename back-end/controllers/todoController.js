const {Todos, Group} = require("../models");


class todoController {
    async getTodos(req, res) {
        try {


            const todos = await Todos.findAll({where: {
                    todo_group_id: req.query.group_id,

            }})

            return res.status(200).json(todos)

        } catch (e) {
            console.log(e)
        }

    }

    async create(req, res) {
        try {
            console.log(req.body)

            const {todo_title, todo_group_id} = req.body
            const {user_id} = req

            const existingGroup = await Group.findOne({where:{id: todo_group_id}})

            if (!existingGroup) {
                return res.status(400).json({error: "Group doesn't exist"})
            }

            await Todos.create({
                todo_title, todo_group_id, user_id
            })

            return res.status(200).json('done')


        } catch (e) {
            console.log(e)

        }

    }

    async change(req, res) {
        try {
            const {id} = req.params

            const existingTodo = await Todos.findByPk(id)
            if (!existingTodo) {
                return res.status(400).json('Wrong id of todo')
            }

            await existingTodo.update({todo_is_complete: existingTodo.todo_is_complete === 0 ? 1 : 0});

            return res.status(200).json('Todo updated successfully');
        }  catch (e) {
            console.error(e);
            res.status(500).json('Internal Server Error');
        }
    }
}

module.exports = new todoController()