import { faker } from '@faker-js/faker'
import { CreateUser } from '../../src/services/userService.js'

export function userBodyFactory() {
	const body: CreateUser = {
		username: faker.name.firstName(),
		password: faker.internet.password(),
		pictureUrl:
			'https://cdns-images.dzcdn.net/images/artist/58327a7b9ad26d0d4f948f7fc36c6c8b/500x500.jpg'
	}
	return body
}
