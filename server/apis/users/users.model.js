const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.js');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        require: true,
        unique: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: true
    }
});

module.exports = User;