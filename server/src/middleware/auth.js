import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { compareAsc, fromUnixTime } from 'date-fns';
import { JWT_SECRET } from '../constants';

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;    

    if(!authHeader) {
        return next(createError(401, 'Authentication failed'))
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, token) => {
        if(err) {
            return next(createError(403, 'Token verification failed'));
        }

        if(compareAsc(new Date(), fromUnixTime(token.expiry_at)) === 1) {
            return next(createError(403, 'Token expired'));
        }

        req.token = token;

        return next();
    });
};

export default authenticate;