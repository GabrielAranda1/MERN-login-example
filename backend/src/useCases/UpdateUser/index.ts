import { MongooseUsersRepository } from '../../repositories/implementations/MongooseUsersRepository'
import { UpdateUserController } from './UpdateUserController'
import { UpdateUserUseCase } from './UpdateUserUseCase'

const mongooseUsersRepository = new MongooseUsersRepository()

const updateUserUseCase = new UpdateUserUseCase(mongooseUsersRepository)

const updateUserController = new UpdateUserController(updateUserUseCase)

export { updateUserUseCase, updateUserController }
