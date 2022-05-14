import { Request, Response } from 'express'
import * as authService from '../services/authService.js'

export async function signIn(req: Request, res: Response) {
	const auth = await authService.signIn(req.body)

	res.status(200).send(auth)
}
