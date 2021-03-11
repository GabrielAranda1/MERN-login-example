import { IUser } from '../../database/Interfaces/IUser'
import UserSchema from '../../database/Schemas/UserSchema'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

export class MongooseUsersRepository implements IUsersRepository {
  async saveUser(user: User): Promise<void> {
    try {
      const newUser = await UserSchema.create({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        age: user.age,
        password: user.password,
        occupation: user.occupation,
      })
    } catch (err) {
      throw err
    }
  }

  async updateUser(user: User): Promise<void> {
    try {
      const updateUser = await UserSchema.findByIdAndUpdate(user.id, {
        name: user.name,
        lastname: user.lastname,
        age: user.age,
        occupation: user.occupation,
      })
    } catch (err) {
      throw err
    }
  }

  async deleteUser(user_id: string): Promise<void> {
    try {
      const user = await UserSchema.findByIdAndDelete(user_id)
    } catch (err) {
      throw err
    }
  }

  async findByID(id: string): Promise<IUser | null> {
    try {
      const user = await UserSchema.findById(id)

      return user
    } catch (err) {
      throw err
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await UserSchema.findOne({ email })

      return user
    } catch (err) {
      throw err
    }
  }
}
