import { ChangeEvent, useMemo, useState } from 'react'
import './Header.css'

import debounce from 'lodash.debounce'
import { AiOutlineSortDescending as SortIcon } from 'react-icons/ai'
import { BiFilterAlt as FilterIcon, BiSearchAlt as SearchIcon } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import WhereObject from '../../interfaces/WhereObject'
import Filter from '../filter/Filter'

interface Props {
  isLogged : boolean
  setSearchInput : React.Dispatch<React.SetStateAction<string>>
  setFilters: React.Dispatch<React.SetStateAction<WhereObject[]>>
}

function Header({ isLogged, setSearchInput, setFilters } : Props) {
  const [ show, setShow ] = useState(false)
  const navigate = useNavigate()

  const handleSearchOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(target.value)
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(handleSearchOnChange, 500),
    []
  )

  return (
    <div className='header'>
      {
        isLogged ?

          <div className='header-content'>
            <SearchIcon className = "header-icon" color='#fce4db' size={30}/>
            <input className = "search" placeholder="Search books"
              onChange={debouncedChangeHandler}
            />
            <FilterIcon onClick={() => setShow((s) => !s)} className = "header-icon" color='#fce4db' size={30}/>
            { show && <Filter setFilters={setFilters} closeModal={() => setShow(false)}/>}
            <SortIcon className = "header-icon" color='#fce4db' size={30}/>
          </div> :
          <div className='sign-buttons'>
            <button name = "sign-in" onClick={ () => navigate('/Login')}>Sign In</button>
            <button name = "sign-up">Sign Up</button>
          </div>
      }
    </div>
  )
}
export default Header
