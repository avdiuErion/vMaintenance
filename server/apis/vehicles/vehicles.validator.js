const { body } = require('express-validator');

const vehiclesBaseValidator = [
    body('model', 'Modeli duhet te plotesohet').not().isEmpty(),

    body('yearOfProduction', 'Viti i prodhimit duhet te plotesohet').not().isEmpty()
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage('Viti i prodhimit duhet te jete ndermjet 1900 dhe ' + new Date().getFullYear()),

    body('licensePlates', 'Regjistrimi duhet te plotesohet').not().isEmpty(),

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

module.exports = { vehiclesBaseValidator };
