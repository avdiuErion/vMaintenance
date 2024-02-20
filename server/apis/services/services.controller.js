const { getAllServicesByVehicleId, addNewService, getById, updateService, deleteService } = require('./services.service');
const vehicleService = require('../vehicles/vehicles.service');

async function httpGetAllServicesByVehicleId(req, res) {
    try {
        const vehicleId = req.params.vehicleId;
        const data = await getAllServicesByVehicleId(vehicleId);
        const vehicle = await vehicleService.getById(vehicleId);

        res.render('services/services', {
            data,
            vehicle
        });
    } catch (Error) {
        return res.status(400).json(`${Error}`);
    }
}

async function httpGetServiceById(req, res) {
    try {
        const id = req.params.id;
        const service = await getById(id);

        if (service)
            return res.status(200).json(service);

        return res.status(404).json();

    } catch (Error) {
        return res.status(400).json(`${Error}`);
    }
}

async function httpAddNewService(req, res) {
    try {
        const vehicleId = req.params.vehicleId;
        const service = req.body;
        service.vehicleId = vehicleId;

        await addNewService(service);

        const data = await getAllServicesByVehicleId(vehicleId);
        const vehicle = await vehicleService.getById(vehicleId);

        res.render('services/services', {
            data,
            vehicle
        });
    } catch (Error) {
        return res.status(400).json(`${Error}`);
    }
}

async function httpGetAddService(req, res) {
    const vehicleId = req.params.vehicleId;

    res.render('services/add-service', {
        vehicleId
    });
}

async function httpUpdateService(req, res) {
    try {
        const id = req.params.id;
        const service = req.body;
        var updatedService = await updateService(id, service);

        const vehicleId = updateService.vehicleId;
        const data = await getAllServicesByVehicleId(vehicleId);
        const vehicle = await vehicleService.getById(vehicleId);

        res.render('services/services', {
            data,
            vehicle
        });
    } catch (Error) {
        return res.status(400).json(`${Error}`);
    }
}

async function httpGetUpdateService(req, res) {
    const id = req.params.id;
    const data = await getById(id);

    res.render('services/update-service', {
        data
    });
}

async function httpDeleteService(req, res) {
    try {
        const id = req.params.id;
        await deleteService(id);

        res.status(200).json({ message: 'Service deleted' });

    } catch (Error) {
        return res.status(400).json(`${Error}`);
    }
}

module.exports = {
    httpGetAllServicesByVehicleId,
    httpGetServiceById,
    httpAddNewService,
    httpUpdateService,
    httpDeleteService,
    httpGetAddService,
    httpGetUpdateService
};
