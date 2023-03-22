import BookItem from '../../interfaces/BookItem'
import { UserRole } from '../../interfaces/Jwt'
import BookCard from '../bookCard/BookCard'
import './BookList.css'

interface Props {
  bookList: BookItem[]
  userRole?: UserRole
  isLogged: boolean
  onModifyFinished: () => void
}

function BookList( { bookList, userRole, isLogged, onModifyFinished } : Props) {
  return (
    <div className='book-list'>
      {bookList.map(book => {
        return <BookCard isLogged={isLogged} onModifyFinished= {onModifyFinished} userRole = {userRole} key={book.Id} book={book} />
      })}
    </div>
  )
}
export default BookList
