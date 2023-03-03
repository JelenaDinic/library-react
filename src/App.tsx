/* eslint-disable import/order */
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'

import './App.css'

import { CgProfile } from 'react-icons/cg'
import { GiBookshelf } from 'react-icons/gi'

import routes from './route-config'

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          {routes.map(route =>
            <Route key={route.path} path={route.path} element={<route.component />} />
          )}
        </Routes>
      </div>
      <div className='menu'>
        <div className='menu-content'>
          <NavLink to="/Login" ><CgProfile /></NavLink>
          <NavLink to="/Profile" ><GiBookshelf /></NavLink>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
