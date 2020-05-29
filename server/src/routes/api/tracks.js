import express from 'express'
import Track from '../../models/Track'

const router = express.Router()

router.get('/tracks', async (req, res, next) => {
    const tracks = await Track.query()

    res.json(tracks)
})

router.post('/tracks', async (req, res, next) => {
    const track = await Track.query().insertGraph({
        title: req.body.title,
    })
    
    res.json(track)
}) 

router.get('/tracks/:id', async (req, res, next) => {
    const track = await Track.query().findById(req.body.id)

    if(!tracks) {
        return next(createError(404, 'Track not found'))
    }

    res.json(track)
})

router.get('/tracks/:id/uploadFile', async (req, res, next) => {
})

router.get('tracks/:id/deleteFile', async (req, res, next) => {
})

export default router