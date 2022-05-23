import { Movie } from '@prisma/client'
import { listRepository } from '../repositories/listRepository.js'
import { movieRepository } from '../repositories/movieRepository.js'
import * as error from '../utils/errorUtils.js'

async function getLists(userId: number) {
	const lists = await listRepository.getLists(userId)
	return lists
}

async function createList(userId: number, name: string, movies: Movie[]) {
	const list = await listRepository.createList(userId, name)

	for (const movie of movies) await movieRepository.upsert(movie)

	movies.map(async (movie) => {
		await listRepository.addMovieToList(list.id, movie.tmdbId)
	})
}

async function deleteList(id: number, userId: number) {
	const list = await listRepository.findListById(id)

	if (!list) {
		throw error.notFound('This list does not exist')
	}

	if (userId !== list.userId) {
		throw error.unauthorized("This list it's not yours to delete")
	}

	await listRepository.deleteList(list.id)
}

export const listService = {
	createList,
	deleteList,
	getLists
}
