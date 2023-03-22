import './NavBar.css'

import { BiLogOut as LogoutIcon } from 'react-icons/bi'
import { ImHome as HomeIcon } from 'react-icons/im'
import { MdAddCircleOutline as AddIcon } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

import { UserRole } from '../../interfaces/Jwt'
import { removeToken } from '../../services/token.service'
import { isAdmin, isLibrarian } from '../../utilities/roles'

interface Props {
  setIsLogged : React.Dispatch<React.SetStateAction<boolean>>
  isLogged : boolean
  userRole?: UserRole
}

function NavBar({ setIsLogged, isLogged, userRole }  : Props) {

  const logout = () => {
    removeToken()
    setIsLogged(false)
  }

  return (
    <div className='navbar'>
      <div className='navbar-content'>
        <NavLink className = "navbar-icon" to="/" ><HomeIcon className = "icon" size={50} color="#fce4db" /></NavLink>
        {isLogged &&
        <>
          <NavLink className="navbar-icon-logout"
            onClick={() => { logout() } } to='/login'
          >
            <LogoutIcon className = "icon"size={50} color="#fce4db" />
          </NavLink>
          {(userRole && (isAdmin(userRole) || isLibrarian(userRole))) &&
          <NavLink className = "navbar-icon" to="/createBook" >
            <AddIcon className = "icon" size={50} color="#fce4db" />
          </NavLink>
          }

        </>}
      </div>
    </div>
  )
}
export default NavBar
