import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { getUnixTime, addHours, addDays } from 'date-fns'

import authenticate from '../../middleware/auth'
import { hash, validatePasswords } from '../../services/auth'
import { JWT_SECRET } from '../../constants'

import User from '../../models/User'
import Role from '../../models/Role'
import ApiError from '../../utils/errors/ApiError'

const router = express.Router()

router.post('/auth/login', async (req, res, next) => {
    const { username, password, rememberMe } = req.body

    if(!JWT_SECRET) {
        return next(createError(401, 'Jwt secret not found'))
    }

    const user = await User
        .query()
        .where({
			username: username,
			active: true
		})
        .first()
		.withGraphFetched('roles')

    if(!user || !(await user.authenticated(password))) {
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
                username: user.username,
                roles: user.roles
            }
        })
    } catch(e) {
        return next(createError(401, e.message))
    }
})

router.post('/auth/signup', async (req, res, next) => {
    const form = req.body
    const defaultRoles = ['USER']

    const roles = await Role.query().whereIn('name', defaultRoles)

	if(!roles.length) {
		return next(createError(500, 'User could not be created (default roles not found)'))
    }

    try {
        const password = validatePasswords(form.password, form.passwordConfirmation)
        
        const hashed = await hash(password)
            .catch(e => ApiError(500, e.message))

        const user = await User.query().insertGraph({
            email: form.email,
            username: form.username,
            password: hashed,
            active: true
        }).catch(e => ApiError(500, 'User could not be created'))

        user.$relatedQuery('roles').relate(roles)

        res.json(user)
    } catch(e) {
        return next(createError(e.status, e.message))
    }
})

router.get('/auth/get-user', authenticate, async (req, res, next) => {
    const user = await User.query().findById(req.token.id)

    if(!user) {
        return next(createError(401, 'User not found'))
    }

    user.roles = await user.getRoles()

    res.json({
        id: user.id,
        username: user.username,
        roles: user.roles
    })
})

export default router