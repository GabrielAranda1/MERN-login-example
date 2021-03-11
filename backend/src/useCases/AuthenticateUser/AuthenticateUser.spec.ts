import request from 'supertest'
import jwt from 'jwt-decode'

import app from '../../app'
import { connect, disconnect, clearDatabase } from '../../__tests__/db-handler'

beforeAll(async () => await connect())
afterAll(async () => await disconnect())

describe('Tests users login operation', () => {
  it('should return an user login jwt token', async () => {
    const userInfo = {
      name: 'João',
      lastname: 'Silva',
      email: 'joao.silva@email.com',
      password: '12345678',
      age: 25,
      occupation: 'Engenheiro',
    }

    await request(app).post('/users').send(userInfo)

    const resp = await request(app)
      .post('/login')
      .send({ email: userInfo.email, password: userInfo.password })

    const { token } = resp.body

    expect(resp.body).toHaveProperty('token')
  })

  it('should not authenticate user with invalid password or email', async () => {
    const user = { email: 'joao.silva@email.com', password: '0000000' }

    const response = request(app).post('/login').send(user)

    expect((await response).status).toBe(400)
  })
})
