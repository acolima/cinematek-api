import { jest } from '@jest/globals'
import { userRepository } from '../../src/repositories/userRepository.js'
import { userService } from '../../src/services/userService.js'
import { userBodyFactory } from '../factories/userBodyFactory.js'

describe('user service unit test', () => {
	it('should throw conflict error given duplicate username', async () => {
		const user = userBodyFactory()

		jest.spyOn(userRepository, 'findByUsername').mockResolvedValue({
			id: 1,
			...user
		})

		const create = jest.spyOn(userRepository, 'create')

		expect(async () => {
			await userService.createUser(user)
		}).rejects.toEqual({
			type: 'conflict',
			message: 'This username is already taken'
		})

		expect(create).not.toBeCalled()
	})
})
