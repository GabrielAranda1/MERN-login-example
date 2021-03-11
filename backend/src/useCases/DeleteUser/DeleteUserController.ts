import { Request, Response } from 'express'
import { decode } from '../../middlewares/auth'
import { DeleteUserUseCase } from './DeleteUserUseCase'

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params

    const user = await decode(request, response)

    try {
      if (user_id === undefined) throw new Error('Missing identifier')

      await this.deleteUserUseCase.execute(user_id)

      return response.status(201).json({ message: 'Account Deleted' })
    } catch (err) {
      return response.status(400).json({
        error: err.message || 'An error occured while processing your request',
      })
    }
  }
}
