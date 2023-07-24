import { prisma } from "../db.js";

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
	});
}

async function findListById(listId: number) {
	const list = await prisma.list.findUnique({
		where: {
			id: listId
		}
	});

	return list;
}

async function createList(userId: number, name: string) {
	const list = await prisma.list.create({
		data: {
			name,
			userId
		}
	});

	return list;
}

async function addMovieToList(listId: number, movieId: number) {
	return await prisma.listMovies.create({
		data: {
			listId,
			movieId
		}
	});
}

async function deleteList(id: number) {
	return await prisma.list.delete({
		where: {
			id
		}
	});
}

export const listRepository = {
	addMovieToList,
	createList,
	deleteList,
	findListById,
	getLists
};
