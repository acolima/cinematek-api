import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { userRepository } from '../repositories/userRepository.js'
import * as error from '../utils/errorUtils.js'

export type CreateUser = Omit<User, 'id'>

async function createUser(user: CreateUser) {
	const { username, password } = user

	const isUsernameTaken = await userRepository.findByUsername(username)
	if (isUsernameTaken) {
		throw error.conflict('This username is already taken')
	}

	const hashedPassword = bcrypt.hashSync(password, 10)

	await userRepository.create({ ...user, password: hashedPassword })
}

async function findById(id: number) {
	userRepository.findById(id)
}

export const userService = {
	createUser,
	findById
}
