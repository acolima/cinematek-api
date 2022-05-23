import { Router } from 'express'
import { movieController } from '../controllers/movieController.js'
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
	movieController.getMovie
)

userRouter.get(
	'/users/movies/list/:filter',
	tokenValidation,
	movieController.getUserMovies
)

userRouter.get('/users/lists', tokenValidation, movieController.getLists)

userRouter.post(
	'/users/lists/create',
	tokenValidation,
	movieController.createList
)

export default userRouter
