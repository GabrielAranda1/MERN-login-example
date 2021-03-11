import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  lastname: string
  email: string
  password: string
  occupation: string
  age: number
}
