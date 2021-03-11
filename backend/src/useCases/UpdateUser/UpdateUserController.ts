import { Request, Response } from 'express'
import { decode } from '../../middlewares/auth'
import { UpdateUserUseCase } from './UpdateUserUseCase'
import { validateUpdateUserRequest } from './UpdateUserValidations'

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, lastname, occupation, age, email } = request.body
    const { user_id } = request.params

    const user = await decode(request, response)

    // Validate Request parameters
    const validations = await validateUpdateUserRequest({
      email,
      name,
      lastname,
      occupation,
      age,
    })

    if (Object.keys(validations).length > 0) return response.status(400).json(validations)

    try {
      await this.updateUserUseCase.execute(
        {
          email,
          name,
          lastname,
          occupation,
          age,
        },
        user_id
      )

      return response.status(201).json({ message: 'Information updated' })
    } catch (err) {
      return response.status(400).json({
        error: err.message || 'An error occured while processing your request',
      })
    }
  }
}
