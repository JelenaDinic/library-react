import BookItem from '../../interfaces/BookItem'
import BookCard from '../bookCard/BookCard'
import './BookList.css'

interface Props {
  bookList: BookItem[]
}

function BookList( { bookList } : Props) {
  return (
    <div className='book-list'>
      {bookList.map(book => {
        return <BookCard key={book.Id} book={book} />
      })}
    </div>
  )
}
export default BookList
