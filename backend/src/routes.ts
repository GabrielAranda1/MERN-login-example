import { Request, Response, Router } from 'express'
import { createUserController } from './useCases/CreateUser'
import { deleteUserController } from './useCases/DeleteUser'
import { updateUserController } from './useCases/UpdateUser'
import { listUserController } from './useCases/ListUser'

import { auth } from './middlewares/auth'
import { authenticateUserController } from './useCases/AuthenticateUser'

const router = Router()

router.post('/users', (request: Request, response: Response) => {
  return createUserController.handle(request, response)
})

router.post('/login', (request: Request, response: Response) => {
  return authenticateUserController.handle(request, response)
})

//
router.use(auth) // Authorization token is required to connect to all routes listed below this line
//

router.put('/users/:user_id', (request: Request, response: Response) => {
  return updateUserController.handle(request, response)
})

router.delete('/users/:user_id', (request: Request, response: Response) => {
  return deleteUserController.handle(request, response)
})

router.get('/users/:user_id', (request: Request, response: Response) => {
  return listUserController.handle(request, response)
})

export { router }
