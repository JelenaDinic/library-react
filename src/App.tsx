import { useEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import NavBar from './components/navBar/NavBar'
import routes from './route-config'
import { baseAxios } from './services/api.service'

function App() {
  const [ isLogged, setIsLogged ] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogged(true)
    }
  }, [])

  baseAxios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    },
    error => {
      void Promise.reject(error)
    }
  )

  return (
    <BrowserRouter>
      <Header isLogged={isLogged} />
      <div className='main-layout'>
        <NavBar setIsLogged={setIsLogged}  isLogged={isLogged}/>
        <div className='container'>
          <Routes>
            {routes.map(route =>
              <Route
                key={route.path}
                path={route.path}
                element={<route.component setIsLogged={setIsLogged} />}
              />
            )}
          </Routes>
        </div>
      </div>
      <Menu setIsLogged={setIsLogged} isLogged={isLogged} />
    </BrowserRouter>
  )
}

export default App
