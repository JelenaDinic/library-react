import { createRef, useEffect, useState } from 'react'

import { BiDetail as DetailIcon, BiEditAlt as EditIcon } from 'react-icons/bi'
import { BsBookmarkCheck as RentIcon } from 'react-icons/bs'
import { RiDeleteBin6Line as DeleteIcon } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import noCover from '../../assets/no-cover.png'
import BookItem from '../../interfaces/BookItem'
import { UserRole } from '../../interfaces/Jwt'
import rentalService from '../../services/rental.service'
import { isAdmin, isLibrarian } from '../../utilities/roles'
import DeleteBook from '../deleteBook/DeleteBook'
import EditBook from '../editBook/EditBook'
import './BookCard.css'

interface Props {
  book: BookItem,
  userRole?: UserRole
  onModifyFinished: () => void
}

function BookCard({ book, userRole, onModifyFinished }: Props) {
  const [ showEditModal, setShowEditModal ] = useState(false)
  const [ showDeleteDialog, setShowDeleteDialog ] = useState(false)
  const deleteDialogRef = createRef<HTMLDialogElement>()
  const navigate = useNavigate()

  useEffect(() => {
    showDeleteDialog ?
      deleteDialogRef.current?.showModal() :
      deleteDialogRef.current?.close()
  }, [ showDeleteDialog ])

  const rentBook = () => {
    rentalService.rentBook(book.Id).then(() => {
      alert('Successfully rented')
    }).catch(error => {
      console.error(error)
    })
  }

  return (
    <div className="card">
      <img className= "card-cover" src={book.Cover ? 'data:image/png;base64,' + book.Cover : noCover}/>
      <h2 className='card-title'>{book.Title} </h2>
      <p>
        {book.Authors.map((author) => `${author.FirstName} ${author.LastName}`).join(', ')}
      </p>
      <label className="isbn-label" >ISBN : {book.Isbn} </label>
      <div className='card-buttons'>
        <button className='detail-button' onClick={() => navigate('/bookDetail/' + book.Id.toString())}>
          <DetailIcon size={30} />
        </button>
        {
          userRole && (isAdmin(userRole) || isLibrarian(userRole)) ?
            <>
              <button className='detail-button'>
                <EditIcon onClick={() => setShowEditModal((show) => !show)} size={30}/>
              </button>
              { showEditModal &&
              <EditBook onModifyFinished = {onModifyFinished} closeEditModal={() => setShowEditModal(false)} bookId={book.Id}/>}
              <button className='delete-button'>
                <DeleteIcon onClick={() => setShowDeleteDialog(true)} size={30} />
              </button>
              <DeleteBook onModifyFinished = {onModifyFinished} book = {book} deleteDialogRef={deleteDialogRef}
                setShowDeleteDialog={setShowDeleteDialog}
              />
            </>
            :
            <button className='detail-button' onClick={rentBook} ><RentIcon size={30}/></button>
        }

      </div>
    </div>
  )
}
export default BookCard
