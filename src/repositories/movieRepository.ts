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

export const movieRepository = {
	createUserMovie,
	findById,
	findUserMovie,
	getUserMovie,
	getUserMovies,
	insert,
	updateUserMovie
}
