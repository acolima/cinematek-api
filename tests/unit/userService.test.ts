import { jest } from '@jest/globals'
import { userRepository } from '../../src/repositories/userRepository.js'
import { userService } from '../../src/services/userService.js'
import { userBodyFactory } from '../factories/userBodyFactory.js'
import fs from 'fs'

describe('user service unit test', () => {
	it.todo('should throw conflict error given duplicate username')
	//it('should throw conflict error given duplicate username', async () => {
	// 	const user = userBodyFactory()
	// 	const file = fs.readFileSync(`${__dirname}/file.png`)
	// 	jest.spyOn(userRepository, 'findByUsername').mockResolvedValue({
	// 		id: 1,
	// 		...user
	// 	})
	// 	const create = jest.spyOn(userRepository, 'create')
	// 	expect(async () => {
	// 		await userService.createUser(user, file)
	// 	}).rejects.toEqual({
	// 		type: 'conflict',
	// 		message: 'This username is already taken'
	// 	})
	// 	expect(create).not.toBeCalled()
	// })
})
