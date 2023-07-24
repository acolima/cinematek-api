import { Request, Response } from "express";
import { movieService } from "../services/movieService.js";

async function addOrUpdateMovie(req: Request, res: Response) {
	const { action, status } = req.params;
	const movieData = req.body;
	const { userId } = res.locals;

	let actionStatus = false;

	if (status === "true") actionStatus = true;

	await movieService.upsertMovie(userId, movieData, action, actionStatus);

	res.sendStatus(201);
}

async function getMovies(req: Request, res: Response) {
	const { userId } = res.locals;

	const movies = await movieService.getMovies(userId);
	res.send(movies);
}

async function getMovie(req: Request, res: Response) {
	const { userId } = res.locals;
	const { movieId } = req.params;

	const movie = await movieService.getUserMovie(+userId, +movieId);
	res.send(movie);
}

async function getUserMovies(req: Request, res: Response) {
	const { userId } = res.locals;
	const { filter } = req.params;

	const movies = await movieService.getUserMovies(+userId, filter);

	res.send(movies);
}

export const movieController = {
	addOrUpdateMovie,
	getMovie,
	getMovies,
	getUserMovies
};
