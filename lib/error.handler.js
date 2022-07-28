import logger from './logger.js';
export default (error, req, res, next) => {
    logger.error(error.message || error)
    res.status(error.status || 500).json({
        message: error.message || 'Unexpected Server Error',
    })
};