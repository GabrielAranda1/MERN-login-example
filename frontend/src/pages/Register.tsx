import React, { useState, useEffect, FormEvent } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import { IUserRegister } from '../interfaces/IUserRegister'

import '../styles/pages/register.css'

import { api } from '../services/api'
import axios from 'axios'

export default function User() {
  useEffect(() => {
    document.title = 'Create Account'
  }, [])

  const history = useHistory()

  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [occupation, setOccupation] = useState('')
  const [password, setPassword] = useState('')

  const [nameError, setNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [ageError, setAgeError] = useState('')
  const [occupationError, setOccupationError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data: IUserRegister = {
      name,
      lastname,
      email,
      password,
      age: Number(age),
      occupation,
    }

    try {
      const resp = await axios.post(`${api}/users`, data)
      Swal.fire({
        title: resp.data.message,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        history.push('/')
      })
    } catch (err) {
      if (err.response.data.name) setNameError(err.response.data.name)
      else setNameError('')

      if (err.response.data.lastname) setLastNameError(err.response.data.lastname)
      else setLastNameError('')

      if (err.response.data.email) setEmailError(err.response.data.email)
      else setEmailError('')

      if (err.response.data.password) setPasswordError(err.response.data.password)
      else setPasswordError('')

      if (err.response.data.age) setAgeError(err.response.data.age)
      else setAgeError('')

      if (err.response.data.occupation) setOccupationError(err.response.data.occupation)
      else setOccupationError('')

      if (err.response.data.message) setError(err.response.data.message)
      else setError('')
    }
  }

  return (
    <div id='page'>
      <main>
        <form onSubmit={handleSubmit} className='form'>
          <div className='input-block'>
            <label htmlFor='name'>Name</label>
            <input id='name' value={name} onChange={(e) => setName(e.target.value)} />
            <p>{nameError}</p>
          </div>

          <div className='input-block'>
            <label htmlFor='lastname'>Last Name</label>
            <input id='lastname' value={lastname} onChange={(e) => setLastName(e.target.value)} />
            <p>{lastNameError}</p>
          </div>

          <div className='input-block'>
            <label htmlFor='email'>Email</label>
            <input
              className='input-disabled'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>{emailError}</p>
          </div>

          <div className='input-block'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>{passwordError}</p>
          </div>

          <div className='input-block'>
            <label htmlFor='lastname'>Age</label>
            <input id='age' value={age} onChange={(e) => setAge(e.target.value)} />
            <p>{ageError}</p>
          </div>

          <div className='input-block'>
            <label htmlFor='occupation'>Occupation</label>
            <input
              id='occupation'
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
            <p>{occupationError}</p>
          </div>

          <p>{error}</p>

          <button className='confirm-button' type='submit'>
            Create Account
          </button>

          <Link to='/' className='link'>
            Already has an account?
          </Link>
        </form>
      </main>
    </div>
  )
}
