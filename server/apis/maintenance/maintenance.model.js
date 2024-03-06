const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.js');
const Vehicle = require('../vehicles/vehicles.model.js');

const Maintenance = sequelize.define('Maintenance', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        required: true
    },
    notes: {
        type: DataTypes.STRING,
        required: true
    },
    price: {
        type: DataTypes.INTEGER,
        required: true
    },
    contractor: {
        type: DataTypes.STRING,
        required: true
    },
    contractorContact: {
        type: DataTypes.STRING,
    },
});

Maintenance.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

module.exports = Maintenance;