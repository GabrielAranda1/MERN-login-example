import { IUser } from '../database/Interfaces/IUser'
import { User } from '../entities/User'

export interface IUsersRepository {
  saveUser(user: User): Promise<void>
  updateUser(user: User): Promise<void>
  deleteUser(user_id: string): Promise<void>
  findByID(id: string): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>
}
