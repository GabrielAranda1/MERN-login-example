import { IUsersRepository } from '../../repositories/IUsersRepository'

export class ListUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(user_id: string) {
    const user = await this.userRepository.findByID(user_id)

    if (!user) {
      throw new Error('Account not found.')
    }

    return {
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      occupation: user.occupation,
      email: user.email,
    }
  }
}
