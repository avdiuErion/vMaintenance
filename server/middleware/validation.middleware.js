const { validationResult } = require('express-validator');

const ValidateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const simplifiedErrors = errors.array().map(error => ({
            field: error.path,
            message: error.msg
          }));
          return res.status(400).json({ errors: simplifiedErrors });
    }
    next();
};

module.exports = ValidateRequest;