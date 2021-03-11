import React, { useState, useEffect, FormEvent } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

import '../styles/pages/user.css'

import { api } from '../services/api'
import { verifySession, deleteSession } from '../services/auth/session'
import { IUserUpdate } from '../interfaces/IUserUpdate'

interface UserParams {
  user_id: string
}

export default function User() {
  const params = useParams<UserParams>()
  const history = useHistory()

  verifySession(params.user_id).then((cb) => {
    if (cb === null) history.push('/')
  })

  const [user, setUser] = useState<IUserUpdate>({
    age: 0,
    name: '',
    lastname: '',
    occupation: '',
    email: '',
  })

  useEffect(() => {
    console.log(axios.defaults.headers.Authorization)
    if (!axios.defaults.headers.Authorization)
      axios.defaults.headers.Authorization = `Bearer ${localStorage.jwtToken}`

    axios.get(`${api}/users/${params.user_id}`).then((response) => {
      const { age, email, lastname, name, occupation } = response.data

      setName(name)
      setLastName(lastname)
      setAge(age)
      setOccupation(occupation)
      setEmail(email)
    })
  }, [])

  const [name, setName] = useState(user.name)
  const [lastname, setLastName] = useState(user.lastname)
  const [email, setEmail] = useState(user.email)
  const [age, setAge] = useState(String(user.age))
  const [occupation, setOccupation] = useState(user.occupation)

  const [nameError, setNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [ageError, setAgeError] = useState('')
  const [occupationError, setOccupationError] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'User Info'
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data: IUserUpdate = {
      name,
      lastname,
      email,
      age: Number(age),
      occupation,
    }

    try {
      const resp = await axios.put(`${api}/users/${params.user_id}`, data)
      Swal.fire({
        text: resp.data.message,
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (err) {
      if (err.response.data.name) setNameError(err.response.data.name)
      else setNameError('')

      if (err.response.data.lastname) setLastNameError(err.response.data.lastname)
      else setLastNameError('')

      if (err.response.data.email) setEmailError(err.response.data.email)
      else setEmailError('')

      if (err.response.data.age) setAgeError(err.response.data.age)
      else setAgeError('')

      if (err.response.data.occupation) setOccupationError(err.response.data.occupation)
      else setOccupationError('')

      if (err.response.data.message) setError(err.response.data.message)
      else setError('')
    }
  }

  async function handleDelete(event: FormEvent) {
    event.preventDefault()

    Swal.fire({
      title: 'Are you sure you want to delete your account?',
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isDenied) {
        deleteSession().then(() => {
          const response = axios.delete(`${api}/users/${params.user_id}`).then((resp) => {
            Swal.fire({ title: 'Account Deleted', timer: 1500 }).then(() => history.push('/'))
          })
        })
      }
    })
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
              disabled
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>{emailError}</p>
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
            Update
          </button>

          <p onClick={handleDelete} className='delete'>
            Delete Account
          </p>
        </form>
      </main>
    </div>
  )
}
