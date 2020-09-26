import express from 'express'
import createError from 'http-errors'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'

import authenticate from '../../middleware/auth'
import { generateWaveform } from '../../services/waveform'
import { decryptToken } from '../../services/token'
import { STORAGE_DIR } from '../../constants'

import Track from '../../models/Track'

const router = express.Router()

router.get('/tracks', async (req, res, next) => {
	let token = null

	try {
		token = decryptToken(req.headers.authorization)
	} catch(e) {
	}

	const tracks = await Promise.all((await Track.getPublicTracks()).map(async (track) => {
		return track.getPublicJson(token ? token.id : null)
	}))
	
	res.json(tracks)
})

router.post('/tracks', authenticate, async (req, res, next) => {
    const userId = req.token.id

    const status = "DISABLED"

    const track = await Track.query().insertGraph({
		id: req.body.id,
		user_id: userId,
        title: req.body.title,
        description: req.body.description,
        status: status,
    })
    
    res.json(track)
})

router.post('/tracks/generate-waveforms', authenticate, async (req, res, next) => {
	const tracks = await Track.query()

	await Promise.all(await tracks.map(async (track) => {
        try {
            const file = fs.readFileSync(track.getTrackFile())

            const waveform = await generateWaveform(file)

            await track.$query().patch({
                waveform: JSON.stringify(waveform)
            })
        } catch(e) {
            console.log(e.message)
        }
	}))

	res.json({
		numUpdated: tracks.length
	})
})

router.get('/tracks/:id', async (req, res, next) => {
    const track = await Track
        .query()
        .findById(req.params.id)

    if(!track) {
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

	res.sendFile(track.getTrackFile())
})

router.post('/tracks/:id/like', authenticate, async (req, res, next) => {
    const track = await Track.query().findById(req.params.id)

	await track.$relatedQuery('likes').relate(req.token.id)

	const updated = await track.$query().withGraphFetched('user').withGraphFetched('likes')

    res.json(updated.getPublicJson(req.token.id))
})

router.post('/tracks/:id/unlike', authenticate, async (req, res, next) => {
	const track = await Track.query().findById(req.params.id)

	await track.$relatedQuery('likes').unrelate().where('id', req.token.id)

	const updated = await track.$query().withGraphFetched('user').withGraphFetched('likes')

    res.json(updated.getPublicJson(req.token.id))
})

router.post('/tracks/:id/upload-track', async (req, res, next) => {
    const file = req.files.file

    let track = await Track.query().findById(req.params.id)

    if(!track) {
        return next(createError(404, 'Track not found'))
    }

    try {
        const waveform = await generateWaveform(file.data)

        await track.$query().patch({
            waveform: JSON.stringify(waveform)
        })
    } catch(e) {
        console.log(e)
    }

    const filename = 'track.' + file.name.split('.').pop()

    try {
        await file.mv(`${STORAGE_DIR}/${track.id}/${filename}`)
    } catch(e) {
        console.log(e.message)
    }

    ffmpeg(`${STORAGE_DIR}/${track.id}/${filename}`)
        .ffprobe(async (err, data) => {
            if(err) {
                console.log(err)
            }

            const duration = data.format.duration

            await track.$query().patchAndFetch({
                file: filename,
                original_file: file.name,
                duration: duration,
                status: "ENABLED"
            })
        })


    res.json({})
})

router.delete('/tracks/:id/delete-track', async (req, res, next) => {
})

export default router