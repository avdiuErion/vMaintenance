const express = require('express');
const { Authorize } = require('../middleware/authorization.middleware');

const servicesRouter = express.Router();

const {
    httpGetAllServicesByVehicleId,
    httpAddNewService,
    httpGetServiceById,
    httpDeleteService,
    httpUpdateService
} = require('../controllers/services.controller');

servicesRouter.get('/GetByVehicleId/:vehicleId', Authorize, httpGetAllServicesByVehicleId);
servicesRouter.post('/', Authorize, httpAddNewService);
servicesRouter.get('/:id', Authorize, httpGetServiceById);
servicesRouter.delete('/:id', Authorize, httpDeleteService);
servicesRouter.put('/', Authorize, httpUpdateService);

module.exports = servicesRouter;