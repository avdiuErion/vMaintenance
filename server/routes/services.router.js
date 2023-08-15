const express = require('express');

const servicesRouter = express.Router();

const {
    httpGetAllServicesByVehicleId,
    httpAddNewService,
    httpGetServiceById,
    httpDeleteService,
    httpUpdateService
} = require('../controllers/services.controller');

servicesRouter.get('/GetByVehicleId/:vehicleId', httpGetAllServicesByVehicleId);
servicesRouter.post('/', httpAddNewService);
servicesRouter.get('/:id', httpGetServiceById);
servicesRouter.delete('/:id', httpDeleteService);
servicesRouter.put('/', httpUpdateService);

module.exports = servicesRouter;