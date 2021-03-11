import bcrypt from 'bcrypt'

export async function bcryptHash(password: string): Promise<string> {
  const salt = bcrypt.genSaltSync(10)

  const hashedPassword = bcrypt.hashSync(password, salt)

  return hashedPassword
}
