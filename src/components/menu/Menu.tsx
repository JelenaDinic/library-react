import './Menu.css'

import { BsThreeDots } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { GiBookshelf } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'

function Menu() {
  return (
    <div className='menu'>
      <div className='menu-content'>
        <NavLink to="/Login" ><CgProfile size={25} color="white"/></NavLink>
        <NavLink to="/Books" ><GiBookshelf size={25} color="white"/></NavLink>
        <BsThreeDots size={25} color="white"/>
      </div>
    </div>
  )
}
export default Menu
