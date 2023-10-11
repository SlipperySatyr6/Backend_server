require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.ACCESS_TOKEN_SECRET;

const validatetoken = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;
    if( authHeader && authHeader.startsWith('Bearer')){;
        token = authHeader && authHeader.split(' ')[1];
        jwt.verify(token, secret, (err, user) => {
            if(err){
                return res.status(403).json({ success: false, error: 'Token not valid' });
            }
            req.user = user.user;
            console.log(user.user);
            next();
        });
    }
    if(token == null){
        return res.status(401).json({ success: false, error: 'User not autherized or Token not found' });
    }
}

module.exports = validatetoken;