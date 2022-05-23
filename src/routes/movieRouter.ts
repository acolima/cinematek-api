import { Router } from 'express'
import { movieController } from '../controllers/movieController.js'
import { tokenValidation } from '../middlewares/tokenValidationMiddleware.js'

const movieRouter = Router()

movieRouter.post(
	'/movies/:action/:status',
	tokenValidation,
	movieController.addOrUpdateMovie
)

export default movieRouter
