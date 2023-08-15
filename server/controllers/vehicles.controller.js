const { getAllVehicles, addNewVehicle, getById, updateVehicle, deleteVehicle } = require('../models/vehicles/vehicles.model');

async function httpGetAllVehicles(req, res){
    try{
        return res.status(200).json(await getAllVehicles());
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

async function httpGetVehicleById(req, res){
    try{
        const id = req.params.id;
        const vehicle = await getById(id);
    
        if(vehicle)
            return res.status(200).json(vehicle);

        return res.status(404).json();
    }catch(Error){
        return res.status(400).json(`${Error}`);
    } 
}

async function httpAddNewVehicle(req, res){
    try{
        const vehicle = req.body;
        var createdVehicle = await addNewVehicle(vehicle);
    
        return res.status(201).json(createdVehicle);
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

async function httpUpdateVehicle(req, res){
    try{
        const vehicle = req.body;
        var updatedVehicle = await updateVehicle(vehicle);
    
        return res.status(200).json(updatedVehicle);
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

async function httpDeleteVehicle(req, res){
    try{
        const id = req.params.id;
        await deleteVehicle(id);
    
        return res.status(200).json({
            message: 'Vehicle successfully deleted!'
        });
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

module.exports = {
    httpGetAllVehicles,
    httpAddNewVehicle,
    httpGetVehicleById,
    httpDeleteVehicle,
    httpUpdateVehicle
};
