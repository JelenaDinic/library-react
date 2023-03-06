import './Header.css'
import { BiSearchAlt, BiFilterAlt } from 'react-icons/bi'
import { AiOutlineSortDescending } from 'react-icons/ai'

function Header() {
  return (
    <div className='header'>
      <div className='header-content'>
        <input placeholder="Search books..."/> <BiSearchAlt color='orange' size={30}/>
        <BiFilterAlt color='orange' size={30}/>
        <AiOutlineSortDescending color='orange' size={30}/>
      </div>
    </div>
  )
}
export default Header
