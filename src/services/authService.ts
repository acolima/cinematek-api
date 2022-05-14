import { User } from '@prisma/client'
import * as userRepository from '../repositories/userRepository.js'
import * as error from '../utils/errorUtils.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export type UserLogin = Omit<User, 'id' | 'pictureUrl'>

export async function signIn(body: UserLogin) {
	const { username, password } = body

	const user = await userRepository.findByUsername(username)
	if (!user) {
		throw error.unauthorized('Incorrect username or password')
	}

	if (!bcrypt.compareSync(password, user.password)) {
		throw error.unauthorized('Incorrect username or password')
	}

	const data = { id: user.id }
	const secret = process.env.JWT_SECRET

	const token = jwt.sign(data, secret)

	return { username, pictureUrl: user.pictureUrl, token }
}
