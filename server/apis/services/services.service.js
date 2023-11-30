const Service = require('./services.model');

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
    await adjustCheckBoxes(service);
    const serviceRecord = await Service.findById(id);
    if(!serviceRecord)
        throw new Error(`Service doesn't exist`);

    return await Service.findByIdAndUpdate(id, service);
}

async function deleteService(id){
    const service = await Service.findById(id);
    if(!service)
        throw new Error(`Service doesn't exist`);

    return await Service.findByIdAndDelete(id);
}

async function adjustCheckBoxes(service){
    if(service.oil == null || service.oil == '')
        service.oil = false;
    if(service.oilFilter == null || service.oilFilter == '')
        service.oilFilter = false;
    if(service.fuelFilter == null || service.fuelFilter == '')
        service.fuelFilter = false;
    if(service.airFilter == null || service.airFilter == '')
        service.airFilter = false;
}


module.exports = {
    getAllServicesByVehicleId,
    getById,
    addNewService,
    updateService,
    deleteService
};