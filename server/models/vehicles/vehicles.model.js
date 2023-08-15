const Vehicle = require('./vehicles.mongo');

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

    vehicle.createdAt = Date.now;

    return await Vehicle.create(vehicle);
}

async function updateVehicle(vehicle){
    const vehicleRecord = await Service.findById(vehicle._id);
    if(!vehicleRecord)
        throw new Error(`Vehicle doesn't exist`);

    return await Vehicle.findByIdAndUpdate(vehicle._id, vehicle);
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