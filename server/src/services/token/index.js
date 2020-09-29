import jwt from 'jsonwebtoken'
import { compareAsc, fromUnixTime } from 'date-fns'
import { JWT_SECRET } from '../../constants'
import ApiError from '../../utils/errors/ApiError'

const decryptToken = (authorization) => {
    if(!authorization) {
		throw new ApiError(401, 'Authentication failed')
    }

    const token = authorization.split(' ')[1]

    return jwt.verify(token, JWT_SECRET, (err, token) => {
        if(err) {
			throw new ApiError(403, 'Token verification failed')
        }

        if(compareAsc(new Date(), fromUnixTime(token.expiryAt)) === 1) {
			throw new ApiError(403, 'Token expired')
		}

        return token
    })
}

const tokenIfExists = (authorization) => {
    try {
        return decryptToken(authorization)
    } catch(e) {
        return null
    }
}

export {
    decryptToken,
    tokenIfExists
}