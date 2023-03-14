import BookResponse from '../../interfaces/BookItem'
import './BookCard.css'

interface Props {
  book: BookResponse
}

function BookCard({ book }: Props) {

  return (
    <div className="card">
      <div  className='section'>
        <img className= "cover" src={book.Cover}/>
        <input type="file"/>
      </div>
      <div  className='section'>
        <label className="name-label" >Title</label>
        <input className = "form-input" type="text" value={book.Title}/>
      </div>
      <div className='section'>
        <label className="isbn-label" >ISBN</label>
        <input className = "form-input" type="text" value={book.Title}/>
      </div>
      <div  className='section'>
        <label className="quantity-label" >Quantity</label>
        <input className = "form-input" type="number" min={0}/>
      </div>
      <div className='section'>
        <p>
          {book.Authors.map((author) => `${author.FirstName} ${author.LastName}`).join(', ')}
        </p>
      </div>
    </div>
  )
}
export default BookCard
