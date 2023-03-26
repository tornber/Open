const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Credentials = sequelize.define('credentials', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
})


module.exports = Credentials;