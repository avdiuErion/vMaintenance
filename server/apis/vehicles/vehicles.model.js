const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.js');
const User = require('../users/users.model.js');

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    model: {
        type: DataTypes.STRING,
        required: true
    },
    yearOfProduction: {
        type: DataTypes.INTEGER,
        required: true,
    },
    licensePlates: {
        type: DataTypes.STRING,
        required: true
    },
    kilometres: {
        type: DataTypes.STRING,
        required: true
    },
});

Vehicle.belongsTo(User, { foreignKey: 'userId' });

module.exports = Vehicle;