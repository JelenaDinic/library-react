import './Menu.css'

import { BiLogOut as LogoutIcon } from 'react-icons/bi'
import { GiBookshelf as BooksIcon } from 'react-icons/gi'
import { MdAddCircleOutline as AddIcon } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

import { UserRole } from '../../interfaces/Jwt'
import { removeToken } from '../../services/token.service'
import { isUserAdmin, isUserLibrarian } from '../../utilities/roles'

interface Props {
  setIsLogged : React.Dispatch<React.SetStateAction<boolean>>
  isLogged : boolean
  userRole?: UserRole
}

function Menu( { setIsLogged, isLogged, userRole }  : Props) {

  const logout = () => {
    removeToken()
    setIsLogged(false)
  }
  return (
    <div className='menu'>
      <div className='menu-content'>
        <NavLink to="/Books" ><BooksIcon size={25} color="#fce4db"/></NavLink>

        {isLogged &&
        <> {(userRole && (isUserAdmin(userRole) || isUserLibrarian(userRole))) &&
          <NavLink className = "navbar-icon" to="/createBook" >
            <AddIcon className = "icon" size={25} color="#fce4db" />
          </NavLink>
        }
        <NavLink onClick={() => { logout() } } to='/login' ><LogoutIcon size={25} color="#fce4db" /></NavLink>
        </>
        }
      </div>
    </div>
  )
}
export default Menu
