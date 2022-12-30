import { Movie } from "@prisma/client";
import { prisma } from "../db.js";

async function findById(id: number) {
	return await prisma.movie.findFirst({
		where: { tmdbId: id }
	});
}

async function upsert(movieData: Movie) {
	return await prisma.movie.upsert({
		where: { tmdbId: movieData.tmdbId },
		update: {},
		create: movieData
	});
}

async function findUserMovie(movieId: number, userId: number) {
	return await prisma.userMovies.findFirst({
		where: {
			movieId,
			userId
		}
	});
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
	});
}

async function updateUserMovie(id: number, action: string, status: boolean) {
	if (action === "watched") {
		return await prisma.userMovies.update({
			where: {
				id
			},
			data: {
				[action]: status,
				modifyAt: new Date()
			}
		});
	}

	return await prisma.userMovies.update({
		where: {
			id
		},
		data: {
			[action]: status
		}
	});
}

async function getUserMovie(id: number, movieId: number) {
	return await prisma.userMovies.findFirst({
		where: {
			userId: id,
			movieId: movieId
		}
	});
}

async function getUserMovies(id: number, filter: string) {
	return await prisma.userMovies.findMany({
		where: {
			userId: id,
			[filter]: true
		},
		select: {
			id: true,
			movie: true
		}
	});
}

async function getMovies(id: number) {
	return await prisma.userMovies.findMany({
		where: {
			userId: id
		},
		select: {
			id: true,
			favorite: true,
			watchlist: true,
			watched: true,
			movie: true,
			modifyAt: true
		},
		orderBy: {
			modifyAt: "desc"
		}
	});
}

async function removeUserMovie(movieId: number) {
	return await prisma.userMovies.delete({
		where: {
			id: movieId
		}
	});
}

export const movieRepository = {
	createUserMovie,
	findById,
	findUserMovie,
	getMovies,
	getUserMovie,
	getUserMovies,
	removeUserMovie,
	updateUserMovie,
	upsert
};
