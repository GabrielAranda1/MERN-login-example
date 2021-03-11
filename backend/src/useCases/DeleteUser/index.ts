import { MongooseUsersRepository } from '../../repositories/implementations/MongooseUsersRepository'
import { DeleteUserController } from './DeleteUserController'
import { DeleteUserUseCase } from './DeleteUserUseCase'

const mongooseUsersRepository = new MongooseUsersRepository()

const deleteUserUseCase = new DeleteUserUseCase(mongooseUsersRepository)

const deleteUserController = new DeleteUserController(deleteUserUseCase)

export { deleteUserUseCase, deleteUserController }
