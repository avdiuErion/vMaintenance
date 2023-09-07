const express = require('express');
const { Authorize } = require('../middleware/authorization.middleware');

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

maintenacesRouter.post('/:vehicleId', Authorize, httpAddNewMaintenance);

maintenacesRouter.delete('/:id', Authorize, httpDeleteMaintenance);

maintenacesRouter.put('/:id', Authorize, httpUpdateMaintenance);

module.exports = maintenacesRouter;