import { RefObject } from 'react'

import { useNavigate } from 'react-router-dom'

import BookItem from '../../interfaces/BookItem'
import SingleBookResponse from '../../interfaces/SingleBookResponse'
import bookService from '../../services/book.service'

import './DeleteBook.css'

interface Props {
  deleteDialogRef: RefObject<HTMLDialogElement>
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>
  book: BookItem | SingleBookResponse
  onModifyFinished?: () => void
}

function DeleteBook({ deleteDialogRef, setShowDeleteDialog, book, onModifyFinished }: Props) {
  const navigate = useNavigate()

  const deleteBook = () => {
    bookService.deleteBook(book.Id).then(() => {
      navigate('/')
      setShowDeleteDialog(false)
      onModifyFinished && onModifyFinished()
    }).catch(error => console.error(error))
  }

  return(
    <dialog className='delete-dialog' ref={deleteDialogRef}>
      <h2>Are you sure you want to delete book {book.Title} ?</h2>
      <div className='delete-dialog-bottons'>
        <button className='delete-dialog-botton-close'
          onClick={() => setShowDeleteDialog(false)}
        >Close
        </button>
        <button className='delete-dialog-botton-confirm' onClick={deleteBook}>Confirm</button>
      </div>
    </dialog>
  )
}

export default  DeleteBook
