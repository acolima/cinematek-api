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

userRouter.get('/movies/:movieId', tokenValidation, movieController.getMovie)

userRouter.get(
	'/movies/list/:filter',
	tokenValidation,
	movieController.getUserMovies
)

userRouter.get('/lists', tokenValidation, movieController.getLists)

userRouter.post('/lists/create', tokenValidation, movieController.createList)

export default userRouter
