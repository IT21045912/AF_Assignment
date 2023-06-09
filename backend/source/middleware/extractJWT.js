const jwt = require('jsonwebtoken');
const logging = require('../config/logging');
const config = require('../config/config');

const NAMESPACE = 'Auth';

const extractJWT = (req, res, next) => {
    logging.info(NAMESPACE, 'Validating token');

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error,
                    error
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

module.exports = extractJWT;
