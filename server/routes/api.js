const express = require('express');

const vehiclesRouter = require('./vehicles.router');
const servicesRouter = require('./services.router');
const usersRouter = require('./users.router');

const api = express.Router();

api.use('/vehicles', vehiclesRouter);
api.use('/services', servicesRouter);
api.use('/users', usersRouter);

api.get('', async (req, res) => {
    try{
        res.render('index');
    }catch(error){
        console.log(error);
    }
});

module.exports = api;