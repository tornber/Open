const {Sequelize} = require('sequelize');
const sequelize = new Sequelize({
    host: 'localhost',
    port: '8888',
    dialect: 'mysql',
    username: 'root',
    password: '1234',
    database: 'task_managment'
});

module.exports = sequelize;