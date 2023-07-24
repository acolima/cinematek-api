import { Request, Response } from "express";
import { authService } from "../services/authService.js";

async function signIn(req: Request, res: Response) {
	const auth = await authService.signIn(req.body);
	res.status(200).send(auth);
}

export const authController = {
	signIn
};
