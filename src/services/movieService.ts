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

	await movieRepository.upsertUserMovie(movieId, userId, action, status)
}

async function getUserMovie(id: number, movieId: number) {
	return await movieRepository.getUserMovie(id, movieId)
}

export const movieService = {
	getUserMovie,
	upsertMovie
}
