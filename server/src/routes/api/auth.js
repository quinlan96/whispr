import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { getUnixTime, addHours, addDays } from 'date-fns'

import authenticate from '../../middleware/auth'
import User from '../../models/User'
import { JWT_SECRET } from '../../constants'

const router = express.Router()

router.post('/auth/login', async (req, res, next) => {
    const { username, password, rememberMe } = req.body

    if(!JWT_SECRET) {
        return next(createError(401, 'Jwt secret not found'))
    }

    const user = await User
        .query()
        .where('username', username)
        .first()

    if(!user || !user.authenticated(password)) {
        return next(createError(401, 'Username and password do not match'))
    }

    let expiryAt = getUnixTime(addHours(new Date(), 1))

    if(rememberMe) {
        expiryAt = getUnixTime(addDays(new Date(), 30))
    }

    try {
        const accessToken = jwt.sign({
            id: user.id,
            username: user.username,
            expiry_at: expiryAt
        }, JWT_SECRET)

        res.json({
            token: accessToken,
            user: {
                id: user.id,
                username: user.username
            }
        })
    } catch(e) {
        return next(createError(401, e.message))
    }
})

router.post('/auth/signup', async (req, res, next) => {
})

router.get('/auth/get-user', authenticate, async (req, res, next) => {
    const user = await User.query().findById(req.token.id)

    res.json({
        id: user.id,
        username: user.username
    })
})

export default router