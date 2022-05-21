import { Request, Response } from 'express'
import { userService } from '../services/userService.js'
import { movieService } from '../services/movieService.js'

async function signUp(req: Request, res: Response) {
	await userService.createUser(req.body)

	res.sendStatus(201)
}

export const userController = {
	signUp
}
