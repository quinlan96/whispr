import express from 'express' 
import vineRouter from './vines'
import uploadRouter from './upload'
import creatorRouter from './creators'

const router = express.Router()

router.use(vineRouter)
router.use(uploadRouter)
router.use(creatorRouter)

export default router;