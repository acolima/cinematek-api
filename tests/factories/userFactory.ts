import bcrypt from "bcrypt";

import { prisma } from "../../src/db.js";
import { CreateUser } from "../../src/services/userService.js";

export async function userFactory(user: CreateUser) {
	return await prisma.user.create({
		data: {
			...user,
			password: bcrypt.hashSync(user.password, 10)
		}
	});
}
