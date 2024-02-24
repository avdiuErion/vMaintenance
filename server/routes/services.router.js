const express = require('express');
const { Authorize } = require('../middleware/authorization.middleware');
const { servicesBaseValidator } = require('../apis/services/services.validator');
const ValidateRequest = require('../middleware/validation.middleware');

const servicesRouter = express.Router();

const {
    httpGetAllServicesByVehicleId,
    httpAddNewService,
    httpGetServiceById,
    httpDeleteService,
    httpUpdateService,
    httpGetAddService,
    httpGetUpdateService
} = require('../apis/services/services.controller');

servicesRouter.get('/GetByVehicleId/:vehicleId', Authorize, httpGetAllServicesByVehicleId);
servicesRouter.post('/:vehicleId', [Authorize, servicesBaseValidator, ValidateRequest], httpAddNewService);
servicesRouter.get('/:vehicleId/add-service', Authorize, httpGetAddService);
servicesRouter.get('/:id', Authorize, httpGetServiceById);
servicesRouter.delete('/:id', Authorize, httpDeleteService);
servicesRouter.put('/:id', [Authorize, servicesBaseValidator, ValidateRequest], httpUpdateService);
servicesRouter.get('/update-service/:id', Authorize, httpGetUpdateService);

module.exports = servicesRouter;