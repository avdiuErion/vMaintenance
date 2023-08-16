const express = require('express');
const { Authorize } = require('../middleware/authorization.middleware');

const vehiclesRouter = express.Router();

const {
    httpGetAllVehicles,
    httpAddNewVehicle,
    httpGetVehicleById,
    httpDeleteVehicle,
    httpUpdateVehicle
} = require('../controllers/vehicles.controller');

vehiclesRouter.get('/', Authorize, httpGetAllVehicles);
vehiclesRouter.post('/', Authorize, httpAddNewVehicle);
vehiclesRouter.get('/:id', Authorize, httpGetVehicleById);
vehiclesRouter.delete('/:id', Authorize, httpDeleteVehicle);
vehiclesRouter.put('/', Authorize, httpUpdateVehicle);

module.exports = vehiclesRouter;