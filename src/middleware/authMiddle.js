const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');

/**
 * Authenticate a User's token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const authenticateToken = ((req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send({status: "Error", message: "No token provided"});
    } else {
        const token = req.headers.authorization.split(' ')[1];
        const publicKeyPEM = process.env.PUBLIC_KEY;
        const publicKey = fs.readFileSync(publicKeyPEM, 'utf8');
        jwt.verify(token, publicKey, {algorithm: 'RS256'}, (err, user) => {
            if (err) {
                res.status(403).send({status: "Error", message: "Invalid token"});
            } else {
                req.user = user;
                next();
            }
        });
    }
});

module.exports = 
{
    authenticateToken
}