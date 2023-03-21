import { FormEvent, useState } from 'react'

import axios, { AxiosError } from 'axios'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

import { Jwt, roleKey, UserRole } from '../../interfaces/Jwt'
import LoginCredentials from '../../interfaces/LoginCredentials'
import { getLogin } from '../../services/auth.service'
import { setToken } from '../../services/token.service'
import './Login.css'

interface Props {
  setIsLogged : React.Dispatch<React.SetStateAction<boolean>>
  setUserRole : React.Dispatch<React.SetStateAction<UserRole | undefined>>
}

function Login({ setIsLogged, setUserRole  } : Props) {
  const [ user, setUser ] = useState<LoginCredentials>({ Email: '', Password: '' })
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
      setIsLogged(true)
      setUserRole(jwtDecode<Jwt>(response.data.AccessToken)[roleKey])
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
