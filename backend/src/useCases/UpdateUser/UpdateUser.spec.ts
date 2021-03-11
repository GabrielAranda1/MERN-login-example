import request from 'supertest'
import jwt from 'jwt-decode'

import app from '../../app'
import { connect, disconnect, clearDatabase } from '../../__tests__/db-handler'

beforeAll(async () => await connect())
beforeEach(async () => await clearDatabase)
afterAll(async () => await disconnect())

describe('Update all user information except email', () => {
  it('should update user`s name, lastname, password, age and occupation', async () => {
    const userInfo = {
      name: 'João',
      lastname: 'Silva',
      email: 'joao.silva@email.com',
      password: '12345678',
      age: 25,
      occupation: 'Engenheiro',
    }

    const newUserInfo = {
      name: 'João',
      lastname: 'Silveira',
      email: 'joao.silva@email.com',
      password: '987654321',
      age: 35,
      occupation: 'Marinheiro',
    }

    await request(app).post('/users').send(userInfo)

    const resp = await request(app)
      .post('/login')
      .send({ email: userInfo.email, password: userInfo.password })

    const { token } = resp.body

    const data: any = jwt(token)

    const updateResp = await request(app)
      .put(`/users/${data.id}`)
      .send(newUserInfo)
      .set('Authorization', `Bearer ${token}`)

    expect((await updateResp).status).toBe(201)
  })
})
