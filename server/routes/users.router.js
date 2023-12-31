const express = require('express');
const { Authorize } = require('../middleware/authorization.middleware');

const usersRouter = express.Router();

const {
    httpRegisterUser,
    httpLogUserIn,
    httpLogUserOut,
    httpGetAllUsers,
    httpDeleteUser
} = require('../apis/users/users.controller');

usersRouter.post('/register', httpRegisterUser);
usersRouter.post('/login', httpLogUserIn);
usersRouter.get('/logout', Authorize, httpLogUserOut);
usersRouter.get('/', Authorize, httpGetAllUsers);
usersRouter.delete('/:id', Authorize, httpDeleteUser);

module.exports = usersRouter;