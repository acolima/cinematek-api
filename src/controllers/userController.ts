import { Request, Response } from "express";
import { userService } from "../services/userService.js";

async function signUp(req: Request, res: Response) {
	const { body } = res.locals;
	const file = req.file;

	await userService.createUser(body, file);

	res.sendStatus(201);
}

export const userController = {
	signUp
};
