import './Menu.css'

import { BiLogOut as LogoutIcon } from 'react-icons/bi'
import { BsThreeDots as MoreIcon } from 'react-icons/bs'
import { CgProfile as ProfileIcon } from 'react-icons/cg'
import { GiBookshelf as BooksIcon } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'

import { removeToken } from '../../services/token.service'

interface Props {
  setIsLogged : React.Dispatch<React.SetStateAction<boolean>>
  isLogged : boolean
}

function Menu( props  : Props) {

  const logout = () => {
    removeToken()
    props.setIsLogged(false)
  }
  return (
    <div className='menu'>
      <div className='menu-content'>
        <NavLink to="/Profile" ><ProfileIcon size={25} color="#fce4db"/></NavLink>
        <NavLink to="/Home" ><BooksIcon size={25} color="#fce4db"/></NavLink>
        {props.isLogged && <NavLink onClick={() => { logout() } } to='/Login' ><LogoutIcon size={25} color="#fce4db" /></NavLink>}
        <MoreIcon size={25} color="#fce4db"/>
      </div>
    </div>
  )
}
export default Menu
