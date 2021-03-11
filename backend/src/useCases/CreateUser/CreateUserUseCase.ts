import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { bcryptHash } from '../../security/bcryptHash'
import ICreateUserDTO from './ICreateUserDTO'

export class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new Error('Email already in use')
    }

    data.password = await bcryptHash(data.password) // hashes user's password

    const user = new User(data)

    await this.userRepository.saveUser(user)
  }
}
