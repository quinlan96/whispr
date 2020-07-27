import jwt from 'jsonwebtoken'
import { compareAsc, fromUnixTime } from 'date-fns'
import { JWT_SECRET } from '../constants'

const token = (authorization) => {
    if(!authHeader) {
        return
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, JWT_SECRET, (err, token) => {
        if(err) {
            return next(createError(403, 'Token verification failed'))
        }

        if(compareAsc(new Date(), fromUnixTime(token.expiryAt)) === 1) {
            return next(createError(403, 'Token expired'))
        }

        return token
    })
}

export default token