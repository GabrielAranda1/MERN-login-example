import mongoose from 'mongoose'

import { IUser } from '../Interfaces/IUser'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    occupation: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model<IUser>('users', UserSchema)
