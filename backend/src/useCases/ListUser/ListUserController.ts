import { Request, Response } from 'express'
import { decode } from '../../middlewares/auth'
import { ListUserUseCase } from './ListUserUseCase'

export class ListUserController {
  constructor(private listUserUseCase: ListUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params

    await decode(request, response)

    try {
      if (user_id === undefined) throw new Error('Missing identifier')

      const user = await this.listUserUseCase.execute(user_id)

      return response.status(201).json(user)
    } catch (err) {
      return response.status(400).json({
        error: err.message || 'An error occured while processing your request',
      })
    }
  }
}
