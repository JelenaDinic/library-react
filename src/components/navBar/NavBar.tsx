import './NavBar.css'

import { CgProfile } from 'react-icons/cg'
import { GiBookshelf } from 'react-icons/gi'
import { ImHome } from 'react-icons/im'
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <div className='navbar'>
      <div className='navbar-content'>
        <NavLink className = "icon" to="/Home" ><ImHome size={50} color="#fce4db" /></NavLink>
        <NavLink className = "icon" to="/Login" ><CgProfile size={50} color="#fce4db" /></NavLink>
        <NavLink className = "icon" to="/Books" ><GiBookshelf size={50} color="#fce4db" /></NavLink>
      </div>
    </div>
  )
}
export default NavBar
