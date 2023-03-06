/* eslint-disable import/order */
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'

import './App.css'

import { CgProfile } from 'react-icons/cg'
import { GiBookshelf } from 'react-icons/gi'
import { BsThreeDots } from 'react-icons/bs'

import routes from './route-config'
import NavBar from './components/navBar/NavBar'
import Header from './components/header/Header'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className='container'>
        <Routes>
          {routes.map(route =>
            <Route key={route.path} path={route.path} element={<route.component />} />
          )}
        </Routes>
      </div>
      <div className='menu'>
        <div className='menu-content'>
          <NavLink to="/Login" ><CgProfile size={25} color="white"/></NavLink>
          <NavLink to="/Books" ><GiBookshelf size={25} color="white"/></NavLink>
          <BsThreeDots size={25} color="white"/>
        </div>
      </div>
      <NavBar />
    </BrowserRouter>
  )
}

export default App
