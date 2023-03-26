const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const Credentials = require('./credentials');
const User = require('./user');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    title: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER
    }
});

Task.belongsTo(User, {
    foreignKey: 'userId', as: 'user'
})

User.hasMany(Task, {
    foreignKey: 'userId',
    as: 'tasks'
})

module.exports = Task;