import express from 'express'
import User from '../../models/User'

import authenticate from '../../middleware/auth'

const router = express.Router()

router.get('/users', async (req, res, next) => {
	const users = await Promise.all((await User.query()).map(async (user) => {
        const roles = await user.getRoles()

		return {
            ...user,
            roles: roles
		}
	}))

    return res.json(users)
})

router.post('/users', async (req, res, next) => {
    const user = await User.query().insertGraph({
        username: req.body.username,
        password: req.body.password,
    })

    res.json(user)
})

router.get('/users/get-user', async (req, res, next) => {
    const username = req.query.username

    if(!username) {
        return next(createError(400, 'Username not provided'))
    }

    const user = await User.query().where('username', username).first()

    if(!user) {
        return next(createError(404, 'User not found'))
    }

    res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        active: user.active
    })
})

router.get('/users/:id', async (req, res, next) => {
    const user = await User.query().findById(req.params.id)

    if(!user) {
        return next(createError(404, 'User not found'))
    }

    res.json(user)
})

router.patch('/users/:id', async (req, res, next) => {
    const user = await User
        .query()
        .patchAndFetchById(req.params.id, req.body)

    res.json(user)
})

router.delete('/users/:id', authenticate, async (req, res, next) => {
    const numDeleted = await User.query().deleteById(req.params.id)

    res.json({
        numDeleted: numDeleted
    })
})

router.get('/users/:id/tracks', async (req, res, next) => {
    const user = await User.query().findById(req.params.id).withGraphFetched('tracks')

    user.tracks = await Promise.all(await user.tracks.map((track) => {
        return track.getPublicJson()
    }))

    res.json(user.tracks)
})

export default router
