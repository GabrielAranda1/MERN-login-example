import request from 'supertest'
import jwt from 'jwt-decode'

import app from '../../app'
import { connect, disconnect, clearDatabase } from '../../__tests__/db-handler'

beforeAll(async () => await connect())
beforeEach(async () => await clearDatabase)
afterAll(async () => await disconnect())

describe('Deletes user account', () => {
  it('should delete an user`s account', async () => {
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

    const data: any = jwt(token)

    const deleteResp = await request(app)
      .delete(`/users/${data.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect((await deleteResp).status).toBe(201)
  })
})
