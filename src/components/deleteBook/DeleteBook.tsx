import { RefObject, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import bookService from '../../services/book.service'

import './DeleteBook.css'

interface Props {
  deleteDialogRef: RefObject<HTMLDialogElement>
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>
  bookId: number
}



function DeleteBook({ deleteDialogRef, setShowDeleteDialog, bookId }: Props) {
  const [ title, setTitle ] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if(bookId !== 0 ) {
      bookService.getBookById(bookId).then((response) => {
        setTitle(response.data.Title)
      }).catch(error => alert(error))
    }

  }, [ ])

  const deleteBook = () => {
    bookService.deleteBook(bookId).then(() => {
      navigate('./Books')
      setShowDeleteDialog(false)
      window.location.reload()
    }).catch(error => console.error(error))
  }

  return(
    <dialog className='delete-dialog' ref={deleteDialogRef}>
      <h2>Are you sure you want to delete book {title} ?</h2>
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
