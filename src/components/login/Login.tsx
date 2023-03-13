import { FormEvent, useState } from 'react'

import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import LoginCredentials from '../../interfaces/LoginCredentials'
import { getLogin } from '../../services/auth.service'
import { setToken } from '../../services/token.service'

import './Login.css'

function Login(props: { setIsLogged : React.Dispatch<React.SetStateAction<boolean>> }) {
  const [ user, setUser ] = useState({ Email: '', Password: '' })
  const [ errorMessage, setErrorMessage ] = useState ('')
  const navigate = useNavigate()

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault()
    const request: LoginCredentials = {
      Email: user.Email,
      Password: user.Password
    }
    getLogin(request).then(response => {
      setToken(response.data.AccessToken)
      props.setIsLogged(true)
      navigate('/')
    }).catch((error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage('Wrong email and/or password.')
        }
      }
    }
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className = "login-input"
        type="email"
        placeholder="Email"
        onChange={(e) => setUser(prevState => ({ ...prevState, Email: e.target.value }))} required
      />
      <input
        className = "login-input"
        type="password"
        placeholder="Password"
        onChange={(e) => setUser(prevState => ({ ...prevState, Password: e.target.value }))} required
      />
      <label className='error-message'>{errorMessage}</label>
      <input className = "submit" type="submit" value="Sign In" />
    </form>
  )
}

export default Login
