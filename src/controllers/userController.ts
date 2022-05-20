import { Request, Response } from 'express'
import { userService } from '../services/userService.js'
import { movieService } from '../services/movieService.js'

async function signUp(req: Request, res: Response) {
	await userService.createUser(req.body)

	res.sendStatus(201)
}

async function getMovie(req: Request, res: Response) {
	const { userId } = res.locals
	const { movieId } = req.params

	const movies = await movieService.getUserMovie(+userId, +movieId)

	res.send(movies)
}

export const userController = {
	getMovie,
	signUp
}
