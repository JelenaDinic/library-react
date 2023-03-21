import BookItem from '../../interfaces/BookItem'
import { UserRole } from '../../interfaces/Jwt'
import BookCard from '../bookCard/BookCard'
import './BookList.css'

interface Props {
  bookList: BookItem[]
  userRole?: UserRole
  onModifyFinished: () => void
}

function BookList( { bookList, userRole, onModifyFinished } : Props) {
  return (
    <div className='book-list'>
      {bookList.map(book => {
        return <BookCard onModifyFinished= {onModifyFinished} userRole = {userRole} key={book.Id} book={book} />
      })}
    </div>
  )
}
export default BookList
