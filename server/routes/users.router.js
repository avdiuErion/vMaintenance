const express = require('express');
const { Authorize } = require('../middleware/authorization.middleware');

const usersRouter = express.Router();

const {
    httpRegisterUser,
    httpLogUserIn,
    httpLogUserOut
} = require('../controllers/users.controller');

usersRouter.post('/register', httpRegisterUser);
usersRouter.post('/login', httpLogUserIn);
usersRouter.get('/logout', Authorize, httpLogUserOut);

module.exports = usersRouter;