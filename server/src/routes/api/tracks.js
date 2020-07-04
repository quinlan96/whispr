import express from 'express'
import createError from 'http-errors'
import authenticate from '../../middleware/auth'

import { STORAGE_DIR } from '../../constants'

import Track from '../../models/Track'

import AudioContext from 'web-audio-api'

const router = express.Router()

const generateWaveform = (audioBuffer) => {
    const rawData = audioBuffer.getChannelData(0)
    const samples = 160
    const blockSize = Math.floor(rawData.length / samples)
    const filteredData = []

    for(let i = 0; i < samples; i++) {
        let blockStart = blockSize * i
        let sum = 0

        for(let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[blockStart + j])
        }

        filteredData.push(sum / blockSize)
    }

    return filteredData
}

const normalizeData = data => {
    const multiplier = Math.pow(Math.max(...data), -1)

    return data.map(n => n * multiplier)
}

router.get('/tracks', async (req, res, next) => {
	const tracks = await Promise.all((await Track.query()).map(async (track) => {
        const user = await track.$relatedQuery('user')

		return {
			id: track.id,
            title: track.title,
            description: track.description,
            trackUrl: track.getTrackUrl(),
            waveform: track.waveform,
            user: user ? user.username : null,
            posted: track.created_at
		}
	}))

    res.json(tracks)
})

router.post('/tracks', authenticate, async (req, res, next) => {
    const userId = req.token.id

    const status = "UNLISTED"

    const track = await Track.query().insertGraph({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        status: status
    })
	
	await track.$relatedQuery('user').relate(userId)
    
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
    
    const status = "UPLOADING"

	const track = await Track.query().findById(id)

	if(!track) {
		return next(createError(404, 'Track not found'))
	}

	if(track.file !== file) {
		return next(createError(404, 'Track file not found'))
	}
	
	res.sendFile(track.getTrackFile())
})

router.post('/tracks/:id/upload-track', async (req, res, next) => {
    const file = req.files.file

    let track = await Track.query().findById(req.params.id)

    if(!track) {
        return next(createError(404, 'Track not found'))
    }

    const audioContext = new AudioContext.AudioContext()

    audioContext.decodeAudioData(file.data, async (audioBuffer) => {
        const waveform = normalizeData(generateWaveform(audioBuffer))
        console.log(waveform)

        await track.$query().patch({
            waveform: JSON.stringify(waveform)
        })
    }, (err) => {
        console.log(err)
    })

    const filename = 'track.' + file.name.split('.').pop()

    try {
        file.mv(`${STORAGE_DIR}/${track.id}/${filename}`)
    } catch(e) {
        console.log(e.message)
    }

    track = await Track.query().patchAndFetchById(track.id, {
        file: filename,
        original_file: file.name
    })

    res.json({})
})

router.delete('/tracks/:id/delete-track', async (req, res, next) => {
})

export default router