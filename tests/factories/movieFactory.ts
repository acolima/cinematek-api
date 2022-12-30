import { Movie } from "@prisma/client";
import { prisma } from "../../src/db.js";

export async function movieFactory(movie: Movie) {
	return await prisma.movie.create({
		data: movie
	});
}
