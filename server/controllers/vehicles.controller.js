const { getAllVehicles, addNewVehicle, getById, updateVehicle, deleteVehicle } = require('../models/vehicles/vehicles.model');

async function httpGetAllVehicles(req, res){
    return res.status(200).json(await getAllVehicles());
}

async function httpGetVehicleById(req, res){
    try{
        const id = req.params.id;
        const vehicle = await getById(id);
    
        return res.status(200).json(vehicle);
    }catch(Error){
        return res.status(400).json(`${Error}`);
    } 
}

async function httpAddNewVehicle(req, res){
    try{
        const vehicle = req.body;
        var createVehicle = await addNewVehicle(vehicle);
    
        return res.status(201).json(createVehicle);
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

async function httpUpdateVehicle(req, res){
    try{
        const vehicle = req.body;
        console.log(vehicle);
        var updatedVehicle = await updateVehicle(vehicle);
    
        return res.status(200).json(updatedVehicle);
    }catch(Error){
        return res.status(400).json(`${Error}`);
    }
}

async function httpDeleteVehicle(req, res){
    try{
        const id = req.params.id;

        console.log(id);
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
