//
// Validates User Input
//
import ICreateUserDTO from './ICreateUserDTO'

export async function validateCreateUserRequest(data: ICreateUserDTO) {
  interface IErrors {
    name?: string
    lastname?: string
    email?: string
    password?: string
    occupation?: string
    age?: string
  }

  const errors: IErrors = {}
  if (typeof data.name !== 'string') {
    errors.name = 'Invalid data type'
  } else if (data.name === undefined || data.name.trim() === '' || data.name === null) {
    errors.name = 'Field cannot be blank'
  } else {
    if (data.name.length === 0) errors.name = 'Name cannot be empty'
  }

  if (typeof data.lastname !== 'string') {
    errors.lastname = 'Invalid data type'
  } else if (data.lastname === undefined || data.lastname.trim() === '' || data.lastname === null) {
    errors.lastname = 'Field cannot be blank'
  } else {
    if (data.lastname.length === 0) errors.lastname = 'Last name cannot be empty'
  }

  if (typeof data.email !== 'string') {
    errors.email = 'Invalid data type'
  } else if (data.email === undefined || data.email.trim() === '' || data.email === null) {
    errors.email = 'Field cannot be blank'
  } else {
    if (data.email.length === 0) errors.email = 'Last name cannot be empty'
  }

  if (typeof data.password !== 'string') {
    errors.password = 'Invalid data type'
  } else if (data.password === undefined || data.password.trim() === '' || data.password === null) {
    errors.password = 'Field cannot be blank'
  } else {
    if (data.password.length === 0) errors.password = 'Last name cannot be empty'
  }

  if (typeof data.occupation !== 'string') {
    errors.occupation = 'Invalid data type'
  } else if (
    data.occupation === undefined ||
    data.occupation.trim() === '' ||
    data.occupation === null
  ) {
    errors.occupation = 'Field cannot be blank'
  }

  if (typeof data.age !== 'number') {
    errors.age = 'Invalid data type'
  } else if (data.age === undefined || data.age === null) {
    errors.age = 'Field cannot be blank'
  } else {
    if (data.age <= 0) errors.age = 'Invalid age'
  }
  return errors
}
