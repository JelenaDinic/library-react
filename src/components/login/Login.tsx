// import { useState } from 'react'

import { FormEvent, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import LoginCredentials from '../../interfaces/LoginCredentials'
import { getLogin } from '../../services/auth.service'

import './Login.css'

function Login(props: { setIsLogged : React.Dispatch<React.SetStateAction<boolean>> }) {
  const [ user, setUser ] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault()
    const request: LoginCredentials = {
      email: user.email,
      password: user.password
    }
    getLogin(request).then(response => {
      localStorage.setItem('token', response.data.accessToken)
      props.setIsLogged(true)
      navigate('/')
    }).catch(error => {alert(error)})
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input className = "login-input" type="email" placeholder="Email" name="uname" onChange={(e) => setUser(prevState => ({ ...prevState, email: e.target.value }))} required/>
      <input className = "login-input" type="password" placeholder="Password" name="psw" onChange={(e) => setUser(prevState => ({ ...prevState, password: e.target.value }))} required/>
      <input className = "submit" type="submit" value="Sign In" />
    </form>
  )
}

export default Login
