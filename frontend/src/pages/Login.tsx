import axios from 'axios'
import React, { useState, useEffect, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { api } from '../services/api'
import { createSession } from '../services/auth/session'

export default function Login() {
  useEffect(() => {
    document.title = 'Login'
  }, [])

  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')

  interface ILogin {
    email: string
    password: string
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data: ILogin = {
      email,
      password,
    }

    try {
      const resp = await axios.post(`${api}/login`, data)
      const user_id = await createSession(resp.data.token)
      history.push({ pathname: `/user/${user_id}` })
    } catch (err) {
      if (err.response.data.email) setEmailError(err.response.data.email)
      else setEmailError('')

      if (err.response.data.password) setPasswordError(err.response.data.password)
      else setPasswordError('')

      if (err.response.data.message) setError(err.response.data.message)
      else setError('')
    }
  }

  return (
    <div id='page'>
      <main>
        <form onSubmit={handleSubmit} className='form'>
          <div className='input-block'>
            <label htmlFor='email'>Email</label>
            <input id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
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

          <p>{error}</p>
          <button className='confirm-button' type='submit'>
            Login
          </button>
          <Link className='link' to='/register'>
            Create new Account
          </Link>
        </form>
      </main>
    </div>
  )
}
