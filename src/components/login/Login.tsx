import { FormEvent, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import LoginCredentials from '../../interfaces/LoginCredentials'
import { getLogin } from '../../services/auth.service'
import { setToken } from '../../services/token.service'

import './Login.css'

function Login(props: { setIsLogged : React.Dispatch<React.SetStateAction<boolean>> }) {
  const [ user, setUser ] = useState({ email: '', password: '' })
  const [ errorMessage, setErrorMessage ] = useState ('')
  const navigate = useNavigate()

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault()
    const request: LoginCredentials = {
      email: user.email,
      password: user.password
    }
    getLogin(request).then(response => {
      setToken(response.data.accessToken)
      props.setIsLogged(true)
      navigate('/')
    }).catch(() => {setErrorMessage('Wrong email and/or password.')})
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className = "login-input"
        type="email"
        placeholder="Email"
        onChange={(e) => setUser(prevState => ({ ...prevState, email: e.target.value }))} required
      />
      <input
        className = "login-input"
        type="password"
        placeholder="Password"
        onChange={(e) => setUser(prevState => ({ ...prevState, password: e.target.value }))} required
      />
      <label className='error-message'>{errorMessage}</label>
      <input className = "submit" type="submit" value="Sign In" />
    </form>
  )
}

export default Login
