import './Header.css'

import { AiOutlineSortDescending as SortIcon } from 'react-icons/ai'
import { BiFilterAlt as FilterIcon, BiSearchAlt as SearchIcon } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

function Header(props: { isLogged : boolean }) {
  const navigate = useNavigate()

  return (
    <div className='header'>
      {
        props.isLogged === true ?

          <div className='header-content'>
            <SearchIcon className = "header-icon" color='#fce4db' size={30}/>
            <input className = "search" placeholder="Search books"/>
            <FilterIcon className = "header-icon" color='#fce4db' size={30}/>
            <SortIcon className = "header-icon" color='#fce4db' size={30}/>
          </div> :
          <div className='sign-buttons'>
            <button name = "sign-in" onClick={() => navigate('/Login')}>Sign In</button>
            <button name = "sign-up">Sign Up</button>
          </div>
      }
    </div>
  )
}
export default Header
