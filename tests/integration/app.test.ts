import supertest from 'supertest'
import { prisma } from '../../src/db.js'
import app from '../../src/index.js'
import { movieBodyFactory } from '../factories/movieBodyFactory.js'
import { movieFactory } from '../factories/movieFactory.js'
import { tokenFactory } from '../factories/tokenFactory.js'
import { userBodyFactory } from '../factories/userBodyFactory.js'
import { userFactory } from '../factories/userFactory.js'

describe('App integration tests', () => {
	beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`
		await prisma.$executeRaw`TRUNCATE TABLE movies CASCADE`
	})

	afterAll(async () => prisma.$disconnect)

	// describe('POST /users/register test', () => {
	// 	it('should return status 201 and persist user given valid body', async () => {
	// 		const user = userBodyFactory()

	// 		const result = await supertest(app).post('/users/register').send(user)

	// 		const userCreated = await prisma.user.findUnique({
	// 			where: { username: user.username }
	// 		})

	// 		expect(result.status).toEqual(201)
	// 		expect(userCreated).not.toBe(null)
	// 	})
	// })

	describe('POST /sign-in test', () => {
		it('should return status 200 and credentials given valid body', async () => {
			const user = userBodyFactory()
			await userFactory(user)

			const result = await supertest(app)
				.post('/sign-in')
				.send({ username: user.username, password: user.password })

			expect(result.status).toEqual(200)
			expect(result.body).not.toBe(null)
		})
	})

	describe('POST /token test', () => {
		it('should return status 200 given valid credentials', async () => {
			const token = await tokenFactory()

			const result = await supertest(app)
				.post('/token')
				.set('Authorization', `Bearer ${token}`)

			expect(result.status).toEqual(200)
		})
	})

	describe('GET /users/movies/:movieId', () => {
		it('should return status 200 and an object given valid credentials', async () => {
			const movie = movieBodyFactory()
			await movieFactory(movie)

			const token = await tokenFactory()

			const result = await supertest(app)
				.get(`/users/movies/${movie.tmdbId}`)
				.set('Authorization', `Bearer ${token}`)

			expect(result.status).toEqual(200)
		})
	})

	describe('POST /movies/:action/:status', () => {
		it('should return status 201 and persist movie given valid credentials', async () => {
			const movie = movieBodyFactory()

			const token = await tokenFactory()

			const result = await supertest(app)
				.post(`/movies/watched/true`)
				.send(movie)
				.set('Authorization', `Bearer ${token}`)

			const createdMovie = await prisma.movie.findUnique({
				where: { tmdbId: movie.tmdbId }
			})

			expect(result.status).toEqual(201)
			expect(createdMovie).not.toBe(null)
		})
	})
})
