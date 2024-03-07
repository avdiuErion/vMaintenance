const { body } = require('express-validator');

const maintenancesBaseValidator = [
    body('title', 'Titulli duhet te plotesohet').not().isEmpty(),

    body('price')
        .custom(value => {
            if (typeof value !== 'undefined' && isNaN(value)) {
                throw new Error('Cmimi duhet te plotesohet duke perdorur vetem numra pozitiv');
            }
            return true;
        })
        .custom(value => {
            if (typeof value !== 'undefined' && value < 0 || value == '') {
                throw new Error('Cmimi nuk mund te jete me pak se 0 e as i zbrazet');
            }
            return true;
        })
];

module.exports = { maintenancesBaseValidator };
