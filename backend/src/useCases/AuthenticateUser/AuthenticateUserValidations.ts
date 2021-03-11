export async function validateUserAuthentication(email: string, password: string) {
  interface IErrors {
    email?: string
    password?: string
  }

  const errors: IErrors = {}

  if (typeof email !== 'string') {
    errors.email = 'Invalid data type'
  } else if (email === undefined || email.trim() === '' || email === null) {
    errors.email = 'Insert your email'
  }

  if (typeof password !== 'string') {
    errors.password = 'Invalid data type'
  } else if (password === undefined || password.trim() === '' || password === null) {
    errors.password = 'Insert your password'
  }

  return errors
}
