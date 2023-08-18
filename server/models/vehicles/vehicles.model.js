const Vehicle = require('./vehicles.mongo');
const Service = require('../services/services.mongo');
const { SendEmail } = require('../../helpers/email.sender');

const serviceKmLimit = process.env.SERVICE_KM_LIMIT;

async function getAllVehicles(){
    return await Vehicle.find({}, {
        '__v': 0
    });
}

async function getById(id){
    return await Vehicle.findById(id);
}

async function addNewVehicle(vehicle){
    if(await existsVehicle(vehicle.licensePlates)){
        throw new Error('Vehicle already exists!')
    }

    vehicle.createdAt = Date.now();

    return await Vehicle.create(vehicle);
}

async function updateVehicle(id, vehicle){
    const vehicleRecord = await Vehicle.findById(id);
    if(!vehicleRecord)
        throw new Error(`Vehicle doesn't exist`);

    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, vehicle);
    const serviceRecord = await Service.findOne({vehicleId: id});

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
    const vehicle = Vehicle.findById(id);
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