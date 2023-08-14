const express = require('express');

const vehiclesRouter = express.Router();

const {
    httpGetAllVehicles,
    httpAddNewVehicle,
    httpGetVehicleById,
    httpDeleteVehicle,
    httpUpdateVehicle
} = require('../controllers/vehicles.controller');

vehiclesRouter.get('/', httpGetAllVehicles);
vehiclesRouter.post('/', httpAddNewVehicle);
vehiclesRouter.get('/:id', httpGetVehicleById);
vehiclesRouter.delete('/:id', httpDeleteVehicle);
vehiclesRouter.put('/', httpUpdateVehicle);

module.exports = vehiclesRouter;