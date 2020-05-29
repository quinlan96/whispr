import express from 'express' 
import userRouter from './users'
import trackRouter from './tracks'

const router = express.Router()

router.use(userRouter)
router.use(trackRouter)

export default router;