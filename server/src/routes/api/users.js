import express from 'express'
import User from '../../models/User'

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

router.get('/users/:id', async (req, res, next) => {
    const user = await User.query().findById(req.body.id)

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

router.delete('/users/:id', async (req, res, next) => {
    const numDeleted = await User.query().deleteById(req.params.id)

    res.json({
        numDeleted: numDeleted
    })
})

export default router
