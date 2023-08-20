const express = require('express');
const { Authorize } = require('../middleware/authorization.middleware');

const vehiclesRouter = express.Router();

const {
    httpGetAllVehicles,
    httpAddNewVehicle,
    httpGetVehicleById,
    httpDeleteVehicle,
    httpUpdateVehicle,
    httpGetUpdateVehicle,
    httpGetAddVehicle
} = require('../controllers/vehicles.controller');

vehiclesRouter.get('/', Authorize, httpGetAllVehicles);
vehiclesRouter.post('/', Authorize, httpAddNewVehicle);
vehiclesRouter.get('/add-vehicle', Authorize, httpGetAddVehicle);
vehiclesRouter.get('/:id', Authorize, httpGetVehicleById);
vehiclesRouter.delete('/:id', Authorize, httpDeleteVehicle);
vehiclesRouter.put('/:id', Authorize, httpUpdateVehicle);
vehiclesRouter.get('/update-vehicle/:id', Authorize, httpGetUpdateVehicle);

module.exports = vehiclesRouter;