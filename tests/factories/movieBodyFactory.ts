import { faker } from '@faker-js/faker'
import { Movie } from '@prisma/client'

export function movieBodyFactory() {
	const body: Movie = {
		tmdbId: 1,
		title: faker.lorem.words(3),
		posterPath: faker.internet.url(),
		backdropPath: faker.internet.url()
	}
	return body
}
