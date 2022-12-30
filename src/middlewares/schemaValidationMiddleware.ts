import { Request, Response, NextFunction } from "express";
import * as error from "../utils/errorUtils.js";

export function schemaValidation(schema: any) {
	return (req: Request, res: Response, next: NextFunction) => {
		let body = req.body;

		if (req.body.data) {
			body = JSON.parse(req.body.data);
		}

		const validation = schema.validate(body);
		if (validation.error)
			throw error.unprocessableEntity(validation.error.message);

		res.locals.body = body;

		next();
	};
}
