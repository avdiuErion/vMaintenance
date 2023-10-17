const Vehicle = require('./vehicles.model');
const Service = require('../services/services.model');
const { SendEmail } = require('../../helpers/email.sender');

const serviceKmLimit = process.env.SERVICE_KM_LIMIT;

async function getAllVehicles(userId){
    return await Vehicle.find({userId: userId}, {
        '__v': 0
    });
}

async function getById(id){
    return await Vehicle.findById(id);
}

async function addNewVehicle(vehicle, userId){
    if(await existsVehicle(vehicle.licensePlates)){
        throw new Error('Vehicle already exists!')
    }

    vehicle.userId = userId;
    vehicle.createdAt = Date.now();

    return await Vehicle.create(vehicle);
}

async function updateVehicle(id, vehicle){
    const vehicleRecord = await Vehicle.findById(id);
    if(!vehicleRecord)
        throw new Error(`Vehicle doesn't exist`);

    await Vehicle.findByIdAndUpdate(id, vehicle);
    
    const serviceRecord = await Service.findOne({vehicleId: id});
    const updatedVehicle = await Vehicle.findById(id);

    let serviceKilometres = 0;

    if(serviceRecord)
        serviceKilometres = serviceRecord.kilometres;

    const emailParameters = {
        vehicleModel: updatedVehicle.model,
        vehicleLicensePlates: updatedVehicle.licensePlates,
        vehicleKilometres: updatedVehicle.kilometres,
        vehicleServiceKilometres: serviceKilometres
    };

    if(updatedVehicle.kilometres - serviceKilometres >= serviceKmLimit)
        await SendEmail(emailParameters);

    return updatedVehicle;
}

async function deleteVehicle(id){
    const vehicle = await Vehicle.findById(id);
    if(!vehicle){
        throw new Error(`Vehicle doesn't exist`);
    }

    await Vehicle.findByIdAndDelete(id);
}

async function existsVehicle(licensePlates){
    return await Vehicle.findOne({
        licensePlates: licensePlates
    });
}

module.exports = {
    getAllVehicles,
    addNewVehicle,
    getById,
    updateVehicle,
    deleteVehicle
};