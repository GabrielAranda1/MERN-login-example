import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { bcryptHash } from '../../security/bcryptHash'
import IUpdateUserDTO from './IUpdateUserDTO'

export class UpdateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IUpdateUserDTO, user_id: string) {
    if (user_id === undefined) throw new Error('Missing user identifier')

    const userAlreadyExists = await this.userRepository.findByID(user_id)

    if (!userAlreadyExists) {
      throw new Error('User not found.')
    }

    data.id = user_id

    const user = new User(data)

    await this.userRepository.updateUser(user)
  }
}
