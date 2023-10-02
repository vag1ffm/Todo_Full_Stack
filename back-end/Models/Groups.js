const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Group = sequelize.define('Group', {
    group_title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    group_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    group_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    group_owner_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    todos_count: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0
    }
});



module.exports = Group