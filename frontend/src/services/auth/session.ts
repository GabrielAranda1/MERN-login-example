import jwt from 'jwt-decode'
import { IUserSession } from '../../interfaces/IUserSession'

import { setAuthToken } from './setAuthToken'

export async function createSession(token: string) {
  localStorage.setItem('jwtToken', token)

  await setAuthToken(token)

  const decodedToken: IUserSession = jwt(token)

  return decodedToken.id
}

export async function verifySession(user_id: string) {
  const token = localStorage.jwtToken

  if (!token) return null

  const decodedToken: IUserSession = jwt(token)

  if (decodedToken.id !== user_id) return null
}

export async function deleteSession() {
  localStorage.removeItem('jwtToken')

  setAuthToken(undefined)
}
