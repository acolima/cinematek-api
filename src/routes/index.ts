import { Router } from 'express'
import authRouter from './authRouter.js'
import movieRouter from './movieRouter.js'
import userRouter from './userRouter.js'

const router = Router()

router.use(authRouter)
router.use(movieRouter)
router.use('/users', userRouter)

export default router
