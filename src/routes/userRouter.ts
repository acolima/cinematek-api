import { Router } from 'express'
import { userController } from '../controllers/userController.js'
import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'
import { tokenValidation } from '../middlewares/tokenValidationMiddleware.js'
import { userSchema } from '../schemas/userSchema.js'

const userRouter = Router()

userRouter.post(
	'/register',
	schemaValidation(userSchema),
	userController.signUp
)

userRouter.get(
	'/users/movies/:movieId',
	tokenValidation,
	userController.getMovie
)

export default userRouter
