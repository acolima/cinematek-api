import { Router } from 'express'
import * as authController from '../controllers/authController.js'

import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'
import { authSchema } from '../schemas/authSchema.js'

const authRouter = Router()

authRouter.post('/sign-in', schemaValidation(authSchema), authController.signIn)

export default authRouter
