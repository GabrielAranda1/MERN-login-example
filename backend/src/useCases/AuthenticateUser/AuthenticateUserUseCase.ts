import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from '../../config/env'

import { IUsersRepository } from '../../repositories/IUsersRepository'
import IAuthenticateUserDTO from './IAuthenticateUserDTO'

export class AuthenticateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IAuthenticateUserDTO) {
    const user = await this.userRepository.findByEmail(data.email)
    if (user) {
      if (await bcrypt.compare(data.password, user.password)) {
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            occupation: user.occupation,
            email: user.email,
            age: user.age,
          },
          env.jwtSecret,
          {
            expiresIn: '1d',
          }
        )

        return token
      } else {
        throw new Error('Incorrect Password')
      }
    } else {
      throw new Error('User not found')
    }
  }
}
