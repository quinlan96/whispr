import express from 'express' 
import authRouter from './auth'
import userRouter from './users'
import trackRouter from './tracks'

const router = express.Router()

router.use(authRouter)
router.use(userRouter)
router.use(trackRouter)

export default router;