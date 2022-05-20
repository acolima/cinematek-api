import { prisma } from '../db.js'
import { NewMovie } from '../services/movieService.js'

async function findById(id: number) {
	return await prisma.movie.findFirst({
		where: { tmdbId: id }
	})
}

async function insert(data: NewMovie, tmdbId: number) {
	return await prisma.movie.create({
		data: {
			...data,
			tmdbId
		}
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

async function upsertUserMovie(
	movieId: number,
	userId: number,
	action: string,
	status: boolean
) {
	return await prisma.userMovies.upsert({
		where: {
			movieId_userId: {
				movieId,
				userId
			}
		},
		create: {
			movieId,
			userId,
			[action]: status
		},
		update: {
			[action]: status
		}
	})
}

async function getUserMovie(id: number, movieId: number) {
	return await prisma.userMovies.findMany({
		where: {
			userId: id,
			movieId: movieId
		}
	})
}

export const movieRepository = {
	findById,
	findUserMovie,
	getUserMovie,
	insert,
	upsertUserMovie
}
