import { jest } from '@jest/globals'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

import { userRepository } from '../../src/repositories/userRepository.js'
import { authService } from '../../src/services/authService.js'
import { userBodyFactory } from '../factories/userBodyFactory.js'

describe('auth service unit test', () => {
	it('should throw unauthorized error given incorrect username', async () => {
		const user = {
			username: faker.name.firstName(),
			password: faker.internet.password()
		}

		jest.spyOn(userRepository, 'findByUsername').mockResolvedValue(null)

		expect(async () => {
			await authService.signIn(user)
		}).rejects.toEqual({
			type: 'unauthorized',
			message: 'Incorrect username or password'
		})
	})

	it('should throw unauthorized error given incorrect password', async () => {
		const user = userBodyFactory()

		jest.spyOn(userRepository, 'findByUsername').mockResolvedValue({
			id: 1,
			...user
		})

		jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false)

		expect(async () => {
			await authService.signIn(user)
		}).rejects.toEqual({
			type: 'unauthorized',
			message: 'Incorrect username or password'
		})
	})
})
