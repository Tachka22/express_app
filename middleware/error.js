const { GeneralError } = require('../utils/errors');

const handleErrors = (error, req, res, next) => {
    if (error instanceof GeneralError) {
        return res.status(err.getCode()).json({
            status: 'error',
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: error.message
    });
}


module.exports = {handleErrors};