import noCover from '../../assets/no-cover.png'
import BookItem from '../../interfaces/BookItem'
import './BookCard.css'

interface Props {
  book: BookItem
}

function BookCard({ book }: Props) {

  return (
    <div className="card">
      <img className= "card-cover" src={book.Cover ? 'data:image/png;base64,' + book.Cover : noCover}/>
      <h2 className='card-title'>{book.Title} </h2>
      <p>
        {book.Authors.map((author) => `${author.FirstName} ${author.LastName}`).join(', ')}
      </p>
      <label className="isbn-label" >ISBN : {book.Isbn} </label>
    </div>
  )
}
export default BookCard
