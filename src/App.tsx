import { useEffect, useState } from 'react'

import jwtDecode from 'jwt-decode'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import BookDetail from './components/bookDetail/BookDetail'
import BookForm from './components/bookForm/BookForm'
import Header from './components/header/Header'
import HomePage from './components/homePage/HomePage'
import Login from './components/login/Login'
import Menu from './components/menu/Menu'
import NavBar from './components/navBar/NavBar'
import { Jwt, roleKey, UserRole } from './interfaces/Jwt'
import WhereObject from './interfaces/WhereObject'
import { PrivateRoutes } from './PrivateRoutes'
import { getToken } from './services/token.service'

function App() {
  const [ isLogged, setIsLogged ] = useState(false)
  const [ searchInput, setSearchInput ] = useState('')
  const [ filters, setFilters ] = useState<WhereObject[]>([])
  const [ sorting, setSorting ] = useState<string[]>([])
  const [ userRole, setUserRole ] =useState<UserRole | undefined >(undefined)

  useEffect(() => {
    const token = getToken()
    if(token) {
      setIsLogged(true)
      setUserRole(jwtDecode<Jwt>(token)[roleKey])
    }
  }, [ ])

  return (
    <BrowserRouter>
      <Header setSorting={setSorting} setSearchInput={setSearchInput} setFilters={setFilters} isLogged={isLogged} />
      <div className='main-layout'>
        <NavBar userRole = {userRole} setIsLogged={setIsLogged}  isLogged={isLogged}/>
        <div className='container'>
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path='/createBook' element={<BookForm
                closeEditModal={() => {null}}
                onModifyFinished={() => {null}}
              />}
              />
              <Route path='/bookDetail/:bookId' element={<BookDetail
                userRole = {userRole}
              />}
              />
            </Route>
            <Route path='/login' element={<Login
              setUserRole = {setUserRole}
              setIsLogged={setIsLogged}
            />}
            />
            <Route path='/' element={<HomePage
              userRole = {userRole}
              filters={filters}
              sorting={sorting}
              searchInput={searchInput}
              isLogged={isLogged}
            />}
            />
            <Route path='*' element={<HomePage
              userRole = {userRole}
              filters={filters}
              sorting={sorting}
              searchInput={searchInput}
              isLogged={isLogged}
            />}
            />
          </Routes>
        </div>
      </div>
      <Menu userRole = {userRole} setIsLogged={setIsLogged} isLogged={isLogged} />
    </BrowserRouter>
  )
}

export default App
