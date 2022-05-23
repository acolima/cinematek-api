import { Request, Response } from 'express'
import { movieService } from '../services/movieService.js'

async function addOrUpdateMovie(req: Request, res: Response) {
	const { action, status } = req.params
	const movieData = req.body
	const { userId } = res.locals

	console.log(movieData)

	let actionStatus = false

	if (status === 'true') actionStatus = true

	await movieService.upsertMovie(userId, movieData, action, actionStatus)

	res.sendStatus(201)
}

async function getMovie(req: Request, res: Response) {
	const { userId } = res.locals
	const { movieId } = req.params

	const movie = await movieService.getUserMovie(+userId, +movieId)
	res.send(movie)
}

async function getUserMovies(req: Request, res: Response) {
	const { userId } = res.locals
	const { filter } = req.params

	const movies = await movieService.getUserMovies(+userId, filter)

	res.send(movies)
}

async function getLists(req: Request, res: Response) {
	const { userId } = res.locals

	const lists = await movieService.getLists(userId)

	res.send(lists)
}

async function createList(req: Request, res: Response) {
	const { userId } = res.locals
	const { name, movies } = req.body

	await movieService.createList(userId, name, movies)

	res.sendStatus(201)
}

export const movieController = {
	addOrUpdateMovie,
	createList,
	getLists,
	getMovie,
	getUserMovies
}
