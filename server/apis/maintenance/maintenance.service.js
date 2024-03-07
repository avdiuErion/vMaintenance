const Maintenance = require('./maintenance.model');

async function getAllMaintenancesByVehicleId(vehicleId) {
    return await Maintenance.findAll({ where: { vehicleId: vehicleId } }, {
        '__v': 0
    });
}

async function getById(id) {
    return await Maintenance.findByPk(id);
}

async function addNewMaintenance(maintenance) {
    return await Maintenance.create(maintenance);
}

async function updateMaintenance(id, maintenance) {
    const maintenanceRecord = await Maintenance.findByPk(id);
    if (!maintenanceRecord)
        throw new Error(`Maintenance doesn't exist`);

    if (maintenanceRecord) {
        Object.assign(maintenanceRecord, maintenance);

        await maintenanceRecord.save();
    }

    return maintenanceRecord;
}

async function deleteMaintenance(id) {
    const maintenance = await Maintenance.findByPk(id);
    if (!maintenance)
        throw new Error(`Maintenance doesn't exist`);

    return await Maintenance.destroy({
        where: { id: id }
    });
}

module.exports = {
    getAllMaintenancesByVehicleId,
    getById,
    addNewMaintenance,
    updateMaintenance,
    deleteMaintenance
};