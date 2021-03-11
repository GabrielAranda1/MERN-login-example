//
// Validates User Input
//
import IUpdateUserDTO from './IUpdateUserDTO'

export async function validateUpdateUserRequest(data: IUpdateUserDTO) {
  interface IErrors {
    name?: string
    lastname?: string
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
    if (data.age < 0) errors.age = 'Invalid age'
  }
  return errors
}
