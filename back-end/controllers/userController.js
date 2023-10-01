const User = require('../models/Users')
const Token = require('../models/Token')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    async create(req, res) {
        try {
            const {username, password, email} = req.body

            if (!username || !password || !email) {
                return res.status(400).json({error: 'Все поля должны быть заполнены'});
            }

            const existingUser = await User.findOne({where: {username}});
            if (existingUser) {
                return res.status(400).json({error: 'Пользователь с таким именем уже существует'});
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = await User.create({
                username, password: hashedPassword, // Сохраняем хэшированный пароль
                email,
            });

            return res.status(201).json({user});

        } catch (e) {
            console.error('Ошибка при создании пользователя:', e);
            return res.status(500).json({error: 'Произошла ошибка при создании пользователя'});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body

            if (!username || !password) {
                return res.status(400).json({error: 'Все поля должны быть заполнены'});
            }

            const existingUser = await User.findOne({where: {username}});
            if (!existingUser) {
                return res.status(400).json({error: 'Пользователь с таким именем уже существует'});
            }


            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (!passwordMatch) {
                return res.status(400).json({error: 'Неверный пароль'});
            }


            const createdToken = jwt.sign({user_id: existingUser.id}, 'amirSoska')

            await Token.create({
                id: createdToken, user_id: existingUser.id, last_login: new Date()
            })

            return res.status(200).json({auth_token: createdToken});

        } catch (e) {
            console.error('Ошибка при попытке входа:', e);
            return res.status(500).json({error: 'Произошла ошибка при попытке входа'});
        }


    }
}


module.exports = new UserController()