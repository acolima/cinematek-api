import { Request, Response } from 'express'
import { movieService } from '../services/movieService.js'

async function addOrUpdateMovie(req: Request, res: Response) {
	const { id, action, status } = req.params
	const movieData = req.body
	const { userId } = res.locals

	let actionStatus = false

	if (status === 'true') actionStatus = true

	await movieService.upsertMovie(
		Number(id),
		userId,
		movieData,
		action,
		actionStatus
	)

	res.sendStatus(201)
}

export const movieController = {
	addOrUpdateMovie
}
