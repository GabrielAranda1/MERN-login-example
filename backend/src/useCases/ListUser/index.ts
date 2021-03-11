import { MongooseUsersRepository } from '../../repositories/implementations/MongooseUsersRepository'
import { ListUserController } from './ListUserController'
import { ListUserUseCase } from './ListUserUseCase'

const mongooseUsersRepository = new MongooseUsersRepository()

const listUserUseCase = new ListUserUseCase(mongooseUsersRepository)

const listUserController = new ListUserController(listUserUseCase)

export { listUserUseCase, listUserController }
