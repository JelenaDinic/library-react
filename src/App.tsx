import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import routes from './route-config'
import NavBar from './components/navBar/NavBar'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className='main-layout'>
        <NavBar />
        <div className='container'>
          <Routes>
            {routes.map(route =>
              <Route key={route.path} path={route.path} element={<route.component />} />
            )}
          </Routes>
        </div>
      </div>
      <Menu/>
    </BrowserRouter>
  )
}

export default App
