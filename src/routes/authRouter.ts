import { Router } from 'express'
import { authController } from '../controllers/authController.js'

import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'
import { tokenValidation } from '../middlewares/tokenValidationMiddleware.js'
import { authSchema } from '../schemas/authSchema.js'

const authRouter = Router()

authRouter.post('/sign-in', schemaValidation(authSchema), authController.signIn)
authRouter.post('/token', tokenValidation, (req, res) => res.send('ok'))

export default authRouter
