const express = require('express');

const vehiclesRouter = require('./vehicles.router');
//const servicesRouter = require('./services.router');

const api = express.Router();

api.use('/vehicles', vehiclesRouter);
//api.use('/services', servicesRouter);

module.exports = api;