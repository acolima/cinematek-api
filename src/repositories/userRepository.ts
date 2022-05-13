import { prisma } from '../db.js'
import { CreateUser } from '../services/userService.js'

export async function findByUsername(username: string) {
	return await prisma.user.findUnique({ where: { username } })
}

export async function create(data: CreateUser) {
	return prisma.user.create({
		data
	})
}
