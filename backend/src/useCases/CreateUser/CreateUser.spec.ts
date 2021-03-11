import request from 'supertest'

import app from '../../app'
import { connect, disconnect, clearDatabase } from '../../__tests__/db-handler'

beforeAll(async () => await connect())
beforeEach(async () => await clearDatabase)
afterAll(async () => await disconnect())

describe('Update all user information except password and email', () => {
  it('should create a new user and return a success', async () => {
    const userInfo = {
      name: 'João',
      lastname: 'Silva',
      email: 'joao.silva@email.com',
      password: '12345678',
      age: 25,
      occupation: 'Engenheiro',
    }

    const response = request(app).post('/users').send(userInfo)
    expect((await response).status).toBe(201)
  })

  it('should not create a user with an existing email previously created', async () => {
    const userInfo = {
      name: 'João',
      lastname: 'Silva',
      email: 'joao.silva@email.com',
      password: '12345678',
      age: 25,
      occupation: 'Engenheiro',
    }

    const response = request(app).post('/users').send(userInfo)

    const response2 = request(app).post('/users').send(userInfo)

    expect((await response2).status).toBe(400)
  })
})
