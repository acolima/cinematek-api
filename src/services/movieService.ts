import { Movie } from "@prisma/client";
import { movieRepository } from "../repositories/movieRepository.js";

async function upsertMovie(
	userId: number,
	movieData: Movie,
	action: string,
	status: boolean
) {
	const { tmdbId } = movieData;

	await movieRepository.findById(tmdbId);

	await movieRepository.upsert(movieData);

	const userMovie = await movieRepository.getUserMovie(userId, tmdbId);

	if (!userMovie) {
		await movieRepository.createUserMovie(tmdbId, userId, action, status);
		return;
	}

	const movieUpdated = await movieRepository.updateUserMovie(
		userMovie.id,
		action,
		status
	);

	if (
		!movieUpdated.favorite &&
		!movieUpdated.watched &&
		!movieUpdated.watchlist
	)
		await movieRepository.removeUserMovie(movieUpdated.id);
}

async function getUserMovie(id: number, movieId: number) {
	return await movieRepository.getUserMovie(id, movieId);
}

async function getMovies(id: number) {
	const movies = await movieRepository.getMovies(id);

	const watched = movies[0].map((m) => {
		return m.movie;
	});

	const watchlist = movies[1].map((m) => {
		return m.movie;
	});

	const favorite = movies[2].map((m) => {
		return m.movie;
	});

	return { watched, watchlist, favorite };
}

async function getUserMovies(id: number, filter: string) {
	return await movieRepository.getUserMovies(id, filter);
}

export const movieService = {
	getMovies,
	getUserMovie,
	getUserMovies,
	upsertMovie
};
