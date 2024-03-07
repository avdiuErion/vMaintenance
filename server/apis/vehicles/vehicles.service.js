const Vehicle = require('./vehicles.model');
const Service = require('../services/services.model');
const { SendEmail } = require('../../helpers/email.sender');

const serviceKmLimit = process.env.SERVICE_KM_LIMIT;

async function getAllVehicles(userId) {
    return await Vehicle.findAll({ where: { userId: userId } }, {
        '__v': 0
    });
}

async function getById(id) {
    return await Vehicle.findByPk(id);
}

async function addNewVehicle(vehicle, userId) {
    if (await existsVehicle(vehicle.licensePlates)) {
        throw new Error('Vehicle already exists!')
    }

    vehicle.userId = userId;
    vehicle.createdAt = Date.now();

    return await Vehicle.create(vehicle);
}

async function updateVehicle(id, vehicle) {
    const vehicleRecord = await Vehicle.findByPk(id);
    if (!vehicleRecord)
        throw new Error(`Vehicle doesn't exist`);

    const existingRecord = await Vehicle.findByPk(id);

    if (vehicle) {
        Object.assign(existingRecord, vehicle);
    
        await existingRecord.save();
    } else {
        console.error('Vehicle not found');
    }

    const serviceRecord = await Service.findOne({
        where: { vehicleId: id },
        order: [['createdAt', 'DESC']] 
    });

    const updatedVehicle = await Vehicle.findByPk(id);

    let serviceKilometres = 0;

    if (serviceRecord)
        serviceKilometres = serviceRecord.kilometres;

    const emailParameters = {
        vehicleModel: updatedVehicle.model,
        vehicleLicensePlates: updatedVehicle.licensePlates,
        vehicleKilometres: updatedVehicle.kilometres,
        vehicleServiceKilometres: serviceKilometres
    };

    if (updatedVehicle.kilometres - serviceKilometres >= serviceKmLimit)
        await SendEmail(emailParameters);

    return updatedVehicle;
}

async function deleteVehicle(id) {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
        throw new Error(`Vehicle doesn't exist`);
    }

    await Vehicle.destroy({
        where: { id: id }
    });
}

async function existsVehicle(licensePlates) {
    return await Vehicle.findOne({
        where: {
            licensePlates: licensePlates
        }
    });
}

module.exports = {
    getAllVehicles,
    addNewVehicle,
    getById,
    updateVehicle,
    deleteVehicle
};