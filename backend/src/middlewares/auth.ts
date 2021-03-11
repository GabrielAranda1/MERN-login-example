import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import decoder from 'jwt-decode'
import env from '../config/env'

export const auth = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    return response.status(401).json({ message: 'Unauthorized.' })
  }

  const [, token] = authHeader.split('Bearer ')

  try {
    await jwt.verify(token, env.jwtSecret)
    next()
  } catch (err) {
    return response.status(401).json({ message: 'Session expired. Please login again.' })
  }
}

export const decode = async (request: Request, response: Response) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ message: 'Session expired. Please login again.' })
  }

  interface ITokenUser {
    id: string
    name: string
    lastname: string
    age: number
    occupation: string
    email: string
  }

  const [, token] = authHeader.split(' ')

  const user = decoder<ITokenUser>(token)

  // Not allow users have access to other user's information based on the token
  if (user.id !== request.params.user_id) return response.status(401)

  return user
}
