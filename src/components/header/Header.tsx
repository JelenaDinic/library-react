import './Header.css'
import { BiSearchAlt as SearchIcon, BiFilterAlt as FilterIcon } from 'react-icons/bi'
import { AiOutlineSortDescending as SortIcon } from 'react-icons/ai'

function Header() {
  return (
    <div className='header'>
      <div className='header-content'>
        <input className = "search" placeholder="Search books..."/> <SearchIcon color='#fce4db' size={30}/>
        <FilterIcon color='#fce4db' size={30}/>
        <SortIcon color='#fce4db' size={30}/>
      </div>
    </div>
  )
}
export default Header
