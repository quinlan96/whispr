import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { getUnixTime, addHours, addDays } from 'date-fns'

import authenticate from '../../middleware/auth'
import { hash, verify } from '../../services/auth'
import { JWT_SECRET } from '../../constants'

import User from '../../models/User'
import Role from '../../models/Role'

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
	const roles = await Role.query().whereIn('name', ['USER'])

	if(!roles.length) {
		next(createError(500, 'The default roles cannot be assigned'))
	}

    const user = await User.query().insertGraph({
		email: req.body.email,
		username: req.body.username,
		password: await hash(req.body.password),
		active: true
	})

	user.$relatedQuery('roles').relate(roles)

    res.json(user)
})

router.get('/auth/get-user', authenticate, async (req, res, next) => {
    const user = await User.query().findById(req.token.id)

    user.roles = await user.getRoles()

    res.json({
        id: user.id,
        username: user.username,
        roles: user.roles
    })
})

router.get('/auth/test', async (req, res, next) => {
	try {
		const hashed = await hash('asdf')

		console.log(await verify('asdf', hashed))
	} catch(e) {
		console.log(e.message)
	}
})

export default router