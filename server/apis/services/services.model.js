const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.js');
const Vehicle = require('../vehicles/vehicles.model.js');

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    kilometres: {
        type: DataTypes.STRING,
        required: true,
        default: null
    },
    oil: {
        type: DataTypes.BOOLEAN,
        required: true,
        default: false
    },
    oilFilter: {
        type: DataTypes.BOOLEAN,
        required: true,
        default: false
    },
    fuelFilter: {
        type: DataTypes.BOOLEAN,
        required: true,
        default: false
    },
    airFilter: {
        type: DataTypes.BOOLEAN,
        required: true,
        default: false
    },
    notes: {
        type: DataTypes.STRING,
    },
});

Service.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

module.exports = Service;