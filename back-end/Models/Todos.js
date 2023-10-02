const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Todos = sequelize.define('Todos', {
    todo_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    todo_group_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    todo_is_complete: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0,
    }
});



module.exports = Todos