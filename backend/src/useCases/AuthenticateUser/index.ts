import { MongooseUsersRepository } from '../../repositories/implementations/MongooseUsersRepository'
import { AuthenticateUserController } from './AuthenticateUserController'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

const mongooseUsersRepository = new MongooseUsersRepository()

const authenticateUserUseCase = new AuthenticateUserUseCase(mongooseUsersRepository)

const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase)

export { authenticateUserUseCase, authenticateUserController }
