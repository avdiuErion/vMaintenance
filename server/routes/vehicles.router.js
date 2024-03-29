const express = require('express');
const { Authorize } = require('../middleware/authorization.middleware');
const ValidateRequest = require('../middleware/validation.middleware');
const { vehiclesBaseValidator } = require('../apis/vehicles/vehicles.validator');

const vehiclesRouter = express.Router();

const {
    httpGetAllVehicles,
    httpAddNewVehicle,
    httpGetVehicleById,
    httpDeleteVehicle,
    httpUpdateVehicle,
    httpGetUpdateVehicle,
    httpGetAddVehicle
} = require('../apis/vehicles/vehicles.controller');

vehiclesRouter.get('/', Authorize, httpGetAllVehicles);
vehiclesRouter.post('/', [Authorize, vehiclesBaseValidator, ValidateRequest], httpAddNewVehicle);
vehiclesRouter.get('/add-vehicle', Authorize, httpGetAddVehicle);
vehiclesRouter.get('/:id', Authorize, httpGetVehicleById);
vehiclesRouter.delete('/:id', Authorize, httpDeleteVehicle);
vehiclesRouter.put('/:id', [Authorize, vehiclesBaseValidator, ValidateRequest], httpUpdateVehicle);
vehiclesRouter.get('/update-vehicle/:id', Authorize, httpGetUpdateVehicle);

module.exports = vehiclesRouter;