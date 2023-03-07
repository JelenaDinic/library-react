import './NavBar.css'

import { CgProfile as ProfileIcon } from 'react-icons/cg'
import { GiBookshelf as BooksIcon } from 'react-icons/gi'
import { ImHome as HomeIcon } from 'react-icons/im'
import { NavLink } from 'react-router-dom'
import { BiLogOut as LogoutIcon } from 'react-icons/bi'

function NavBar() {
  return (
    <div className='navbar'>
      <div className='navbar-content'>
        <NavLink className = "icon" to="/Home" ><HomeIcon size={50} color="#fce4db" /></NavLink>
        <NavLink className = "icon" to="/Login" ><ProfileIcon size={50} color="#fce4db" /></NavLink>
        <NavLink className = "icon" to="/Books" ><BooksIcon size={50} color="#fce4db" /></NavLink>
        <NavLink className = "icon" to="/Login" ><LogoutIcon size={50} color="#fce4db" /></NavLink>
      </div>
    </div>
  )
}
export default NavBar
