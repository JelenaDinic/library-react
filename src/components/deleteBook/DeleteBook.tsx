import { RefObject } from 'react'

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

  const deleteBook = () => {
    bookService.deleteBook(book.Id).then(() => {
      setShowDeleteDialog(false)
      onModifyFinished && onModifyFinished()
    }).catch(error => console.error(error))
  }

  return(
    <div onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()
    }}
    >
      <dialog className='delete-dialog' ref={deleteDialogRef}>
        <h2>Are you sure you want to delete book {book.Title} ?</h2>
        <div className='delete-dialog-bottons'>
          <button className='delete-dialog-botton-close'
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.stopPropagation()
              setShowDeleteDialog(false)
            }}
          >Close
          </button>
          <button className='delete-dialog-botton-confirm' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation()
            deleteBook()
          }}
          >Confirm
          </button>
        </div>
      </dialog>
    </div>

  )
}

export default  DeleteBook
