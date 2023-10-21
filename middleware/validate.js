// 

require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.ACCESS_TOKEN_SECRET;

const validatetoken = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).json({ success: false, error: 'Token not found' });
        }

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.status(403).json({ success: false, error: 'Token not valid' });
            }

            if (!decoded || !decoded.users) {
                console.error('Invalid decoded token:', decoded);
                return res.status(403).json({ success: false, error: 'Invalid token payload' });
            }

            // Add logging to verify that the user information is correctly extracted
            console.log('Decoded token:', decoded);

            req.user = decoded.users;
            next();
        });
    } else {
        return res.status(401).json({ success: false, error: 'User not authorized or Token not found' });
    }
}

module.exports = validatetoken;
