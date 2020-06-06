import express from 'express'
import Track from '../../models/Track'

const router = express.Router()

router.get('/tracks', async (req, res, next) => {
	const tracks = await Promise.all((await Track.query()).map(async (track) => {
		return {
			id: track.id,
			title: track.title,
			duration: track.duration,
			track_url: track.getTrackUrl(),
			user: (await track.$relatedQuery('user')).username,
			posted: track.created_at
		}
	}))

    res.json(tracks)
})

router.post('/tracks', async (req, res, next) => {
    const track = await Track.query().insertGraph({
		title: req.body.title
	})
	
	await track.$relatedQuery('user').relate(req.body.user_id)
    
    res.json(track)
}) 

router.get('/tracks/:id', async (req, res, next) => {
    const track = await Track.query().findById(req.body.id)

    if(!tracks) {
        return next(createError(404, 'Track not found'))
    }

    res.json(track)
})

router.get('/tracks/:id/:file', async (req, res, next) => {
	const { id, file } = req.params

	const track = await Track.query().findById(id)

	if(!track) {
		return next(createError(404, 'Track not found'))
	}

	if(track.file !== file) {
		return next(createError(404, 'Track file not found'))
	}
	
	console.log(track.getTrackFile())
    
	res.sendFile(track.getTrackFile())
})

router.get('/tracks/:id/uploadFile', async (req, res, next) => {
})

router.get('tracks/:id/deleteFile', async (req, res, next) => {
})

export default router