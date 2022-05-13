import joi from 'joi'
import { CreateUser } from '../services/userService.js'

export const userSchema = joi.object<CreateUser>({
	username: joi.string().required(),
	password: joi.string().min(6).required(),
	pictureUrl: joi.string().required()
})
