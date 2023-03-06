import './Header.css'
import { BiSearchAlt, BiFilterAlt } from 'react-icons/bi'
import { AiOutlineSortDescending } from 'react-icons/ai'

function Header() {
  return (
    <div className='header'>
      <div className='header-content'>
        <input placeholder="Search books..."/> <BiSearchAlt color='#fce4db' size={30}/>
        <BiFilterAlt color='#fce4db' size={30}/>
        <AiOutlineSortDescending color='#fce4db' size={30}/>
      </div>
    </div>
  )
}
export default Header
