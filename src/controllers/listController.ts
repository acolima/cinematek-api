import { Request, Response } from "express";
import { listService } from "../services/listService.js";

async function getLists(req: Request, res: Response) {
	const { userId } = res.locals;

	const lists = await listService.getLists(userId);

	res.send(lists);
}

async function createList(req: Request, res: Response) {
	const { userId } = res.locals;
	const { name, movies } = req.body;

	await listService.createList(userId, name, movies);

	res.sendStatus(201);
}

async function deleteList(req: Request, res: Response) {
	const { id } = req.params;
	const { userId } = res.locals;

	await listService.deleteList(+id, userId);

	res.sendStatus(200);
}

export const listController = {
	createList,
	deleteList,
	getLists
};
