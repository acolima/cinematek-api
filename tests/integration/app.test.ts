import supertest from 'supertest'
import { prisma } from '../../src/db.js'
import app from '../../src/index.js'
import { tokenFactory } from '../factories/tokenFactory.js'
import { userBodyFactory } from '../factories/userBodyFactory.js'
import { userFactory } from '../factories/userFactory.js'

describe('App integration tests', () => {
	beforeEach(async () => await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`)

	afterAll(async () => prisma.$disconnect)

	describe('POST /sign-up test', () => {
		it('should return status 201 and persist user given valid body', async () => {
			const user = userBodyFactory()

			const result = await supertest(app).post('/sign-up').send(user)

			const userCreated = await prisma.user.findUnique({
				where: { username: user.username }
			})

			expect(result.status).toEqual(201)
			expect(userCreated).not.toBe(null)
		})
	})

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

	describe('POST /sign-out test', () => {
		it('should return status 200 given valid token', async () => {
			const token = await tokenFactory()

			const result = await supertest(app)
				.post('/sign-out')
				.set('Authorization', `Bearer ${token}`)

			expect(result.status).toEqual(200)
		})
	})
})
