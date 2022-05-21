import { Movie } from '@prisma/client'
import { movieRepository } from '../repositories/movieRepository.js'

export type NewMovie = Omit<Movie, 'tmdbId'>

async function upsertMovie(
	movieId: number,
	userId: number,
	movieData: NewMovie,
	action: string,
	status: boolean
) {
	const movie = await movieRepository.findById(movieId)

	if (!movie) {
		await movieRepository.insert(movieData, movieId)
	}

	const userMovie = await movieRepository.getUserMovie(userId, movieId)

	if (!userMovie) {
		await movieRepository.createUserMovie(movieId, userId, action, status)
		return
	}

	await movieRepository.updateUserMovie(userMovie.id, action, status)
}

async function getUserMovie(id: number, movieId: number) {
	return await movieRepository.getUserMovie(id, movieId)
}

async function getUserMovies(id: number, filter: string) {
	return await movieRepository.getUserMovies(id, filter)
}

export const movieService = {
	getUserMovie,
	getUserMovies,
	upsertMovie
}
