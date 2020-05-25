import express from 'express'
import createError from 'http-errors'
import { Vine } from '../../db'
import shuffle from '../../utils/shuffle'

const router = express.Router()

router.get('/vines', async function(req, res, next) {
	try {
		let query = Vine.find()

		if(req.query.q) {
			query = Vine.fuzzySearch(req.query.q)
		}

		query.sort({createdAt: -1})
		query.limit(30)

		const vines = await query.exec()

		res.json(vines)

	} catch (err) {
		next(createError(500, 'An error occurred fetching vines'))
	}
})

router.put('/vines', async function(req, res, next) {
	res.json(req.body)
	return
	try {
		const vine = new Vine({
			videoId:		req.params.videoId,
			title: 			req.params.title,
			description:	req.params.description,
			url:			req.params.url,
			creator:		req.params.creator
		})

		vine.save();
	} catch (err) {
		console.log(err)
		next(createError(500, 'An error occurred fetching vines'))
	}
})

export default router
