import { ChangeEvent, useMemo, useState } from 'react'
import './Header.css'

import debounce from 'lodash.debounce'
import { AiOutlineSortDescending as SortIcon } from 'react-icons/ai'
import { BiFilterAlt as FilterIcon, BiSearchAlt as SearchIcon } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import WhereObject from '../../interfaces/WhereObject'
import Filter from '../filter/Filter'
import Sorting from '../sorting/Sorting'

interface Props {
  isLogged : boolean
  setSearchInput : React.Dispatch<React.SetStateAction<string>>
  setFilters: React.Dispatch<React.SetStateAction<WhereObject[]>>
  setSorting: React.Dispatch<React.SetStateAction<string[]>>
}

function Header({ isLogged, setSearchInput, setFilters, setSorting } : Props) {
  const [ showFilterModal, setShowFilterModal ] = useState(false)
  const [ showSortModal, setShowSortModal ] = useState(false)
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
            <FilterIcon onClick={() => setShowFilterModal((show) => !show)} className = "header-icon" color='#fce4db' size={30}/>
            { showFilterModal && <Filter setFilters={setFilters} closeFilterModal={() => setShowFilterModal(false)}/>}
            <SortIcon onClick={() => setShowSortModal((show) => !show)} className = "header-icon" color='#fce4db' size={30}/>
            { showSortModal && <Sorting setSorting={setSorting} closeSortModal={() => setShowSortModal(false)}/>}
          </div> :
          <div className='sign-buttons'>
            <button name = "sign-in" onClick={ () => navigate('/login')}>Sign In</button>
          </div>
      }
    </div>
  )
}
export default Header
