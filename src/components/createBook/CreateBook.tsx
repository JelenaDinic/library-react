import noCover from '../../assets/no-cover.png'
import './CreateBook.css'

function CreateBook() {
  return (
    <div className="single-card">
      <img className= "cover" src={noCover}/>
      <div  className='section'>
        <label className="name-label" >Name</label>
        <input className = "name-input" type="text"/>
      </div>
      <div  className='section'>
        <label className="desc-label" >Description</label>
        <input className = "desc-input" type="text"/>
      </div>
      <div className='section'>
        <label className="isbn-label" >ISBN</label>
        <input className = "isbn-input" type="text"/>
      </div>
      <div  className='section'>
        <label className="quantity-label" >Quantity</label>
        <input className = "quantity-input" type="number" min={0}/>
      </div>
    </div>
  )
}
export default CreateBook
