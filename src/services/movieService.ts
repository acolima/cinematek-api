import { Movie } from '@prisma/client'
import { movieRepository } from '../repositories/movieRepository.js'

async function upsertMovie(
	userId: number,
	movieData: Movie,
	action: string,
	status: boolean
) {
	const { tmdbId } = movieData

	await movieRepository.findById(tmdbId)

	await movieRepository.upsert(movieData)

	const userMovie = await movieRepository.getUserMovie(userId, tmdbId)

	if (!userMovie) {
		await movieRepository.createUserMovie(tmdbId, userId, action, status)
		return
	}

	const movieUpdated = await movieRepository.updateUserMovie(
		userMovie.id,
		action,
		status
	)

	if (
		!movieUpdated.favorite &&
		!movieUpdated.watched &&
		!movieUpdated.watchlist
	)
		await movieRepository.removeUserMovie(movieUpdated.id)
}

async function getUserMovie(id: number, movieId: number) {
	return await movieRepository.getUserMovie(id, movieId)
}

async function getUserMovies(id: number, filter: string) {
	return await movieRepository.getUserMovies(id, filter)
}

async function getLists(userId: number) {
	const lists = await movieRepository.getLists(userId)
	return lists
}

async function createList(userId: number, name: string, movies: Movie[]) {
	const list = await movieRepository.createList(userId, name)

	for (const movie of movies) await movieRepository.upsert(movie)

	movies.map(async (movie) => {
		await movieRepository.addMovieToList(list.id, movie.tmdbId)
	})
}

export const movieService = {
	createList,
	getLists,
	getUserMovie,
	getUserMovies,
	upsertMovie
}
