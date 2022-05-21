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

	const teste = await movieRepository.getUserMovie(userId, movieId)
	console.log(teste)

	if (!teste) {
		await movieRepository.createUserMovie(movieId, userId, action, status)
		return
	}

	await movieRepository.updateUserMovie(teste.id, action, status)
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
