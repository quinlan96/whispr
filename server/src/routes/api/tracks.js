import express from 'express'
import createError from 'http-errors'
import fs from 'fs'

import authenticate from '../../middleware/auth'
import { generateWaveform } from '../../services/waveform'
import { STORAGE_DIR } from '../../constants'

import Track from '../../models/Track'

const router = express.Router()

router.get('/tracks', async (req, res, next) => {
	const tracks = await Promise.all((await Track.getPublicTracks()).map(async (track) => {
        return track.getPublicJson(req.token.id)
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

    res.json(track)
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
        file.mv(`${STORAGE_DIR}/${track.id}/${filename}`)
    } catch(e) {
        console.log(e.message)
    }

    track = await track.$query().patchAndFetch({
        file: filename,
		original_file: file.name,
		status: "ENABLED"
    })

    res.json({})
})

router.delete('/tracks/:id/delete-track', async (req, res, next) => {
})

export default router