import './NavBar.css'

import { BiLogOut as LogoutIcon } from 'react-icons/bi'
import { CgProfile as ProfileIcon } from 'react-icons/cg'
import { GiBookshelf as BooksIcon } from 'react-icons/gi'
import { ImHome as HomeIcon } from 'react-icons/im'
import { MdAddCircleOutline as AddIcon } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

import { removeToken } from '../../services/token.service'

interface Props {
  setIsLogged : React.Dispatch<React.SetStateAction<boolean>>
  isLogged : boolean
}

function NavBar(props  : Props) {

  const logout = () => {
    removeToken()
    props.setIsLogged(false)
  }

  return (
    <div className='navbar'>
      <div className='navbar-content'>
        <NavLink className = "navbar-icon" to="/Home" ><HomeIcon className = "icon" size={50} color="#fce4db" /></NavLink>
        <NavLink className = "navbar-icon" to="/Profile" ><ProfileIcon className = "icon" size={50} color="#fce4db" /></NavLink>
        <NavLink className = "navbar-icon" to="/Home" ><BooksIcon className = "icon" size={50} color="#fce4db" /></NavLink>
        <NavLink className = "navbar-icon" to="/CreateBook" ><AddIcon className = "icon" size={50} color="#fce4db" /></NavLink>
        {props.isLogged && <NavLink className="navbar-icon-logout" onClick={() => { logout() } } to='/Login' ><LogoutIcon className = "icon"size={50} color="#fce4db" /></NavLink>}
      </div>
    </div>
  )
}
export default NavBar
