const { getAllVehicles, addNewVehicle, getById, updateVehicle, deleteVehicle } = require('../models/vehicles/vehicles.model');

async function httpGetAllVehicles(req, res) {
    try {
        const data = await getAllVehicles();

        res.render('vehicles/vehicles', {
            data
        });
    } catch (Error) {
        return res.status(400).json(`${Error}`);
    }
}

async function httpGetVehicleById(req, res) {
    try {
        const id = req.params.id;
        const vehicle = await getById(id);

        if (vehicle)
            return res.status(200).json(vehicle);

        return res.status(404).json();
    } catch (Error) {
        return res.status(400).json(`${Error}`);
    }
}

async function httpAddNewVehicle(req, res) {
    try {
        const vehicle = req.body;
        var createdVehicle = await addNewVehicle(vehicle);

        return res.status(201).json(createdVehicle);
    } catch (Error) {
        return res.status(400).json(`${Error}`);
    }
}

async function httpUpdateVehicle(req, res) {
    try {
        const id = req.params.id;
        const vehicle = req.body;
        await updateVehicle(id, vehicle);

        res.redirect('../../vehicles');
    } catch (Error) {
        console.log(Error);
        return res.status(400).json(`${Error}`);
    }
}

async function httpGetUpdateVehicle(req, res) {
    const id = req.params.id;
    const data = await getById(id);

    res.render('vehicles/update-vehicle', {
        data
    });
}

async function httpDeleteVehicle(req, res) {
    try {
        const id = req.params.id;
        await deleteVehicle(id);

        return res.status(200).json({
            message: 'Vehicle successfully deleted!'
        });
    } catch (Error) {
        return res.status(400).json(`${Error}`);
    }
}

module.exports = {
    httpGetAllVehicles,
    httpAddNewVehicle,
    httpGetVehicleById,
    httpDeleteVehicle,
    httpUpdateVehicle,
    httpGetUpdateVehicle
};
