import joi from 'joi'
import { UserLogin } from '../services/authService'

export const authSchema = joi.object<UserLogin>({
	username: joi.string().required(),
	password: joi.string().min(6).required()
})
