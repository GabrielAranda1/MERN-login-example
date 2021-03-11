import { IUsersRepository } from '../../repositories/IUsersRepository'

export class DeleteUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(user_id: string) {
    const userExists = await this.userRepository.findByID(user_id)

    if (!userExists) {
      throw new Error('Account not found.')
    }

    await this.userRepository.deleteUser(user_id)
  }
}
