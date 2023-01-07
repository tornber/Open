const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const Credentials = require('./credentials');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.TINYINT
    },
    lastName: {
        type: DataTypes.STRING
    },
    credentialsId: {
        type: DataTypes.INTEGER
    }
});

// User.hasOne(Credentials, {
//     foreignKey: 'credentialsId',
//     as: 'credentials'
// });
User.belongsTo(Credentials, {
    foreignKey: 'credentialsId',
    as: 'credentials'
})

module.exports = User;