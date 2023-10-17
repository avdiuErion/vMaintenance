const { getAllMaintenancesByVehicleId,
    getById,
    addNewMaintenance,
    updateMaintenance,
    deleteMaintenance } = require('./maintenance.service');

async function httpGetAllMaintenancesByVehicleId(req, res){
    try{
        const vehicleId = req.params.vehicleId;
        const data = await getAllMaintenancesByVehicleId(vehicleId);

        res.render('maintenance/maintenances', {
            data,
            vehicleId
        });
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

async function httpGetMaintenanceById(req, res){
    try{
        const id = req.params.id;
        const maintenace = await getById(id);
    
        if(maintenace)
            return res.status(200).json(maintenace);

        return res.status(404).json();

    }catch(Error){
        return res.status(400).json(`${Error}`);
    } 
}

async function httpAddNewMaintenance(req, res){
    try{
        const vehicleId = req.params.vehicleId;
        const maintenace = req.body;
        maintenace.vehicleId = vehicleId;

        await addNewMaintenance(maintenace);
    
        const data = await getAllMaintenancesByVehicleId(vehicleId);

        res.render('maintenance/maintenances', {
            data,
            vehicleId
        });
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

async function httpGetAddMaintenance(req, res) {
    const vehicleId = req.params.vehicleId;

    res.render('maintenance/add-maintenance', {
        vehicleId
    });
}

async function httpUpdateMaintenance(req, res){
    try{
        const id = req.params.id;
        const maintenace = req.body;
        var updatedMaintenance = await updateMaintenance(id, maintenace);
        
        const vehicleId = updatedMaintenance.vehicleId;
        const data = await getAllMaintenancesByVehicleId(updatedMaintenance.vehicleId);

        res.render('maintenance/maintenances', {
            data,
            vehicleId
        });
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

async function httpGetUpdateMaintenance(req, res) {
    const id = req.params.id;
    const data = await getById(id);

    res.render('maintenance/update-maintenance', {
        data
    });
}

async function httpDeleteMaintenance(req, res){
    try{
        const id = req.params.id;
        await deleteMaintenance(id);
        
        res.status(200).json({ message: 'Maintenance deleted' });
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

module.exports = {
    httpGetAllMaintenancesByVehicleId,
    httpGetMaintenanceById,
    httpAddNewMaintenance,
    httpUpdateMaintenance,
    httpDeleteMaintenance,
    httpGetUpdateMaintenance,
    httpGetAddMaintenance
};
