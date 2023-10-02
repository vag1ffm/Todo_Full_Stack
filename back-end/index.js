const express = require('express')
const {json} = require("express");
const cors = require('cors'); // Импортируйте пакет cors

const authRouter = require('./Routes/authRouter')
const groupRouter = require('./Routes/groupRouter')
const todoRouter = require('./Routes/todoRouter')

const sequelize = require('./config/database');
const User = require('./models/Users');

async function initDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('База данных успешно инициализирована');
    } catch (error) {
        console.error('Ошибка при инициализации базы данных:', error);
    }
}
// initDatabase()




const app = express();

const PORT = 8000

app.use(json())
app.use(cors());


app.use('/api/auth', authRouter )
app.use('/api/groups', groupRouter )
app.use('/api/todos', todoRouter )


app.listen(PORT, ()=> {
    console.log('Server is running on the port:', PORT)
})

