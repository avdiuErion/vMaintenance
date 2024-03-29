const { body } = require('express-validator');

const servicesBaseValidator = [
    body('kilometres', 'Kilometrat duhet te plotesohen').not().isEmpty()
        .custom(value => {
            if (typeof value !== 'undefined' && isNaN(value)) {
                throw new Error('Kilometrat duhet te shkruhen duke perdorur vetem numra');
            }
            return true;
        })
        .custom(value => {
            if (typeof value !== 'undefined' && value < 0) {
                throw new Error('Kilometrat nuk mund te jene me pak se 0');
            }
            return true;
        })
];

module.exports = { servicesBaseValidator };
