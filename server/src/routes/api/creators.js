import express from 'express'
import { Creator } from '../../db'

const router = express.Router()

router.get('/creators', async function(req, res, next) {
	try {
		const result = await Creator
			.aggregate([
				{
					"$lookup": {
						from: "vines",
						localField: "_id",
						foreignField: "creator",
						as: "vinesCount"
					}
				},
				{
					"$addFields": { vinesCount: { $size: "$vinesCount" }}
				},
				{
					"$sort": { vinesCount: -1 }
				}
			])
			.exec()

		const creators = await Promise.all(result.map((row) => {
			return Creator.findOne(row._id)
		}))

		res.json(creators)
	} catch (err) {
		console.log(err)
		res.status(500).json({error: 'An error occurred fetching creators'})
	}
})

router.get('/creator/:id', async function(req, res, next) {
	try {
		const creator = await Creator
			.findOne({creatorId: req.params.id})
			.populate('vines')
			.exec()

		res.json(creator)
	} catch (err) {
		console.log(err)
		res.status(500).json({error: 'An error occurred fetching creators'})
	}
})

export default router
