import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { User } from '@prisma/client'
import { userRepository } from '../repositories/userRepository.js'
import * as error from '../utils/errorUtils.js'
import { supabase } from '../supabase.js'

export type CreateUser = Omit<User, 'id'>

async function createUser(user: CreateUser, pictureFile: Express.Multer.File) {
	const { username, password } = user

	const isUsernameTaken = await userRepository.findByUsername(username)
	if (isUsernameTaken) {
		throw error.conflict('This username is already taken')
	}

	const fileType = pictureFile.mimetype.split('/')[0]

	if (pictureFile && fileType === 'image') {
		const fileExtension = pictureFile.originalname.split('.')[1]
		const fileName = nanoid()
		const filePath = `${fileName}.${fileExtension}`

		const { data: storageData, error: storageError } = await supabase.storage
			.from('public')
			.upload(filePath, pictureFile.buffer, {
				upsert: true
			})

		if (storageError || !storageData) {
			throw error.storageError(storageError.message)
		}

		const {
			data: { publicUrl }
		} = supabase.storage.from('public').getPublicUrl(storageData.path)

		const hashedPassword = bcrypt.hashSync(password, 10)

		const newUser = {
			...user,
			pictureUrl: publicUrl,
			password: hashedPassword
		}

		await userRepository.create(newUser)
	} else {
		throw error.unprocessableEntity('There is no file for the cover')
	}
}

async function findById(id: number) {
	return await userRepository.findById(id)
}

export const userService = {
	createUser,
	findById
}
