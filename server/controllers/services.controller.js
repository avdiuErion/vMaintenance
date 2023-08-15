const { getAllServicesByVehicleId, addNewService, getById, updateService, deleteService } = require('../models/services/services.model');

async function httpGetAllServicesByVehicleId(req, res){
    try{
        const vehicleId = req.params.vehicleId;

        return res.status(200).json(await getAllServicesByVehicleId(vehicleId));
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

async function httpGetServiceById(req, res){
    try{
        const id = req.params.id;
        const service = await getById(id);
    
        if(service)
            return res.status(200).json(service);

        return res.status(404).json();

    }catch(Error){
        return res.status(400).json(`${Error}`);
    } 
}

async function httpAddNewService(req, res){
    try{
        const service = req.body;
        var createdService = await addNewService(service);
    
        return res.status(201).json(createdService);
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

async function httpUpdateService(req, res){
    try{
        const service = req.body;
        var updatedService = await updateService(service);
    
        return res.status(200).json(updatedService);
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

async function httpDeleteService(req, res){
    try{
        const id = req.params.id;

        await deleteService(id);
    
        return res.status(200).json({
            message: 'Service successfully deleted!'
        });
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

module.exports = {
    httpGetAllServicesByVehicleId,
    httpGetServiceById,
    httpAddNewService,
    httpUpdateService,
    httpDeleteService
};
