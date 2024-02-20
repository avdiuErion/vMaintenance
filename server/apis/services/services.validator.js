const { body } = require('express-validator');

const servicesBaseValidator = [
    body('kilometres', 'Kilometrat duhet te plotesohen').not().isEmpty(),
];

module.exports = { servicesBaseValidator };
