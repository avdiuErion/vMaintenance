const Maintenance = require('./maintenance.model');

async function getAllMaintenancesByVehicleId(vehicleId){
    return await Maintenance.find({vehicleId: vehicleId}, {
        '__v': 0
    });
}

async function getById(id){
    return await Maintenance.findById(id);
}

async function addNewMaintenance(maintenance){
    maintenance.createdAt = Date.now();

    return await Maintenance.create(maintenance);
}

async function updateMaintenance(id, maintenance){
    const maintenanceRecord = await Maintenance.findById(id);
    if(!maintenanceRecord)
        throw new Error(`Maintenance doesn't exist`);

    return await Maintenance.findByIdAndUpdate(id, maintenance);
}

async function deleteMaintenance(id){
    const maintenance = await Maintenance.findById(id);
    if(!maintenance)
        throw new Error(`Maintenance doesn't exist`);

    return await Maintenance.findByIdAndDelete(id);
}

module.exports = {
    getAllMaintenancesByVehicleId,
    getById,
    addNewMaintenance,
    updateMaintenance,
    deleteMaintenance
};