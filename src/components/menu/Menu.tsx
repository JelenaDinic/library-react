import './Menu.css'

import { BsThreeDots as MoreIcon } from 'react-icons/bs'
import { CgProfile as ProfileIcon } from 'react-icons/cg'
import { GiBookshelf as BooksIcon } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'

function Menu() {
  return (
    <div className='menu'>
      <div className='menu-content'>
        <NavLink to="/Login" ><ProfileIcon size={25} color="white"/></NavLink>
        <NavLink to="/Books" ><BooksIcon size={25} color="white"/></NavLink>
        <MoreIcon size={25} color="white"/>
      </div>
    </div>
  )
}
export default Menu
