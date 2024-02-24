const express = require('express');
const { Authorize } = require('../middleware/authorization.middleware');
const ValidateRequest = require('../middleware/validation.middleware');
const { maintenancesBaseValidator } = require('../apis/maintenance/maintenance.validator');

const maintenacesRouter = express.Router();

const {
    httpGetAllMaintenancesByVehicleId,
    httpGetMaintenanceById,
    httpAddNewMaintenance,
    httpUpdateMaintenance,
    httpDeleteMaintenance,
    httpGetUpdateMaintenance,
    httpGetAddMaintenance
} = require('../apis/maintenance/maintenance.controller');

maintenacesRouter.get('/byVId/:vehicleId', Authorize, httpGetAllMaintenancesByVehicleId);
maintenacesRouter.get('/:vehicleId/add-maintenance', Authorize, httpGetAddMaintenance);
maintenacesRouter.get('/:id', Authorize, httpGetMaintenanceById);
maintenacesRouter.get('/update-maintenance/:id', Authorize, httpGetUpdateMaintenance);

maintenacesRouter.post('/:vehicleId', [Authorize, maintenancesBaseValidator, ValidateRequest], httpAddNewMaintenance);

maintenacesRouter.delete('/:id', Authorize, httpDeleteMaintenance);

maintenacesRouter.put('/:id', [Authorize, maintenancesBaseValidator, ValidateRequest], httpUpdateMaintenance);

module.exports = maintenacesRouter;