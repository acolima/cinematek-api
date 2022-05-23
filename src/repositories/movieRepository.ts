import { Movie } from '@prisma/client'
import { prisma } from '../db.js'

async function findById(id: number) {
	return await prisma.movie.findFirst({
		where: { tmdbId: id }
	})
}

async function upsert(movieData: Movie) {
	return await prisma.movie.upsert({
		where: { tmdbId: movieData.tmdbId },
		update: {},
		create: movieData
	})
}

async function findUserMovie(movieId: number, userId: number) {
	return await prisma.userMovies.findFirst({
		where: {
			movieId,
			userId
		}
	})
}

async function createUserMovie(
	movieId: number,
	userId: number,
	action: string,
	status: boolean
) {
	return await prisma.userMovies.create({
		data: {
			movieId,
			userId,
			[action]: status
		}
	})
}

async function updateUserMovie(id: number, action: string, status: boolean) {
	return await prisma.userMovies.update({
		where: {
			id
		},
		data: {
			[action]: status
		}
	})
}

async function getUserMovie(id: number, movieId: number) {
	return await prisma.userMovies.findFirst({
		where: {
			userId: id,
			movieId: movieId
		}
	})
}

async function getUserMovies(id: number, filter: string) {
	return await prisma.userMovies.findMany({
		where: {
			userId: id,
			[filter]: true
		},
		select: {
			id: true,
			movies: true
		}
	})
}

async function removeUserMovie(movieId: number) {
	return await prisma.userMovies.delete({
		where: {
			id: movieId
		}
	})
}

async function getLists(userId: number) {
	return await prisma.list.findMany({
		where: {
			userId
		},
		select: {
			id: true,
			name: true,
			listMovies: {
				select: {
					movies: true
				}
			}
		}
	})
}

async function createList(userId: number, name: string) {
	const list = await prisma.list.create({
		data: {
			name,
			userId
		}
	})

	return list
}

async function addMovieToList(listId: number, movieId: number) {
	return await prisma.listMovies.create({
		data: {
			listId,
			movieId
		}
	})
}

export const movieRepository = {
	addMovieToList,
	createList,
	createUserMovie,
	findById,
	findUserMovie,
	getLists,
	getUserMovie,
	getUserMovies,
	removeUserMovie,
	updateUserMovie,
	upsert
}
