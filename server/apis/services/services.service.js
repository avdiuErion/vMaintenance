const Service = require('./services.model');

async function getAllServicesByVehicleId(vehicleId){
    return await Service.findAll({where: {vehicleId: vehicleId}}, {
        '__v': 0
    });
}

async function getById(id){
    return await Service.findByPk(id);
}

async function addNewService(service){
    service.createdAt = Date.now();

    return await Service.create(service);
}

async function updateService(id, service){
    await adjustCheckBoxes(service);
    const serviceRecord = await Service.findByPk(id);
    if(!serviceRecord)
        throw new Error(`Service doesn't exist`);

    if (serviceRecord) {
        Object.assign(serviceRecord, service);
    
        await serviceRecord.save();
    }

    return serviceRecord;
}

async function deleteService(id){
    const service = await Service.findByPk(id);
    if(!service)
        throw new Error(`Service doesn't exist`);

    return await Service.destroy({
        where: { id: id }
    });
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