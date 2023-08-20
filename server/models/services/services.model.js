const Service = require('./services.mongo');

async function getAllServicesByVehicleId(vehicleId){
    return await Service.find({vehicleId: vehicleId}, {
        '__v': 0
    });
}

async function getById(id){
    return await Service.findById(id);
}

async function addNewService(service){
    service.createdAt = Date.now();

    return await Service.create(service);
}

async function updateService(id, service){
    const serviceRecord = await Service.findById(id);
    if(!serviceRecord)
        throw new Error(`Service doesn't exist`);

    return await Service.findByIdAndUpdate(id, service);
}

async function deleteService(id){
    const service = await Service.findById(id);
    if(!service)
        throw new Error(`Service doesn't exist`);

    await Service.findByIdAndDelete(id);
}

module.exports = {
    getAllServicesByVehicleId,
    getById,
    addNewService,
    updateService,
    deleteService
};