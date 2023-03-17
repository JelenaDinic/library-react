import { useEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import NavBar from './components/navBar/NavBar'
import WhereObject from './interfaces/WhereObject'
import routes from './route-config'
import { getToken } from './services/token.service'

function App() {
  const [ isLogged, setIsLogged ] = useState(false)
  const [ searchInput, setSearchInput ] = useState('')
  const [ filters, setFilters ] = useState<WhereObject[]>([])
  const [ sorting, setSorting ] = useState<string[]>([])

  useEffect(() => {
    if (getToken()) {
      setIsLogged(true)
    }
  }, [ searchInput, filters ])

  return (
    <BrowserRouter>
      <Header setSorting={setSorting} setSearchInput={setSearchInput} setFilters={setFilters} isLogged={isLogged} />
      <div className='main-layout'>
        <NavBar setIsLogged={setIsLogged}  isLogged={isLogged}/>
        <div className='container'>
          <Routes>
            {routes.map(route =>
              <Route
                key={route.path}
                path={route.path}
                element={<route.component filters={filters} sorting={sorting} searchInput={searchInput} setIsLogged={setIsLogged} />}
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
