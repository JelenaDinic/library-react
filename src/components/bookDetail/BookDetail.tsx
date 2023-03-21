import { createRef, useEffect, useState } from 'react'

import { BiEditAlt as EditIcon } from 'react-icons/bi'
import { BsBookmarkCheck as RentIcon } from 'react-icons/bs'
import { RiDeleteBin6Line as DeleteIcon } from 'react-icons/ri'
import { useParams } from 'react-router-dom'


import noCover from '../../assets/no-cover.png'
import { UserRole } from '../../interfaces/Jwt'
import SingleBookResponse from '../../interfaces/SingleBookResponse'
import bookService from '../../services/book.service'
import { isUserAdmin, isUserLibrarian } from '../../utilities/roles'
import DeleteBook from '../deleteBook/DeleteBook'
import EditBook from '../editBook/EditBook'

interface Props {
  userRole?: UserRole
}

function BookDetail({ userRole }: Props) {
  const [ cover, setCover ] = useState(noCover)
  const [ showEditModal, setShowEditModal ] = useState(false)
  const [ showDeleteDialog, setShowDeleteDialog ] = useState(false)
  const [ book, setBook ] = useState<SingleBookResponse | null>(null)
  const deleteDialogRef = createRef<HTMLDialogElement>()
  const params= useParams()

  useEffect(() => {
    if (params.bookId) {
      bookService.getBookById(parseInt(params.bookId)).then((response) => {
        setBook(response.data)
        if(response.data.Cover) {
          setCover('data:image/png;base64,' + response.data.Cover)
        }
      }).catch(error => console.error(error))
    }
    showDeleteDialog ?
      deleteDialogRef.current?.showModal() :
      deleteDialogRef.current?.close()
  }, [ showDeleteDialog ])


  return (
    <div className="single-card">
      {book ?
        <>
          <div className='all-inputs'>
            <div className='cover-section'>
              <div  className='section'>
                <img className="cover" src={cover}/>
              </div>
            </div>
            <div className='forms-sections'>
              <div  className='section'>
                <label className="name-label" >Title</label>
                <label>{book.Title}</label>
              </div>
              <div className='section'>
                <label className="isbn-label" >ISBN</label>
                <label>{book.ISBN}</label>
              </div>
              <div  className='section'>
                <label>{book.Description}</label>
              </div>
              <div  className='section' >

                <label className="authors-label" >Authors</label>
                <div className='author-section'>
                  {book.Authors.map(author => {
                    return <li key={author.Id}>{`${author.Firstname} ${author.Lastname}`}</li>
                  })}
                </div>
              </div>
              <div className='section'>
                <label className="date-label" >Publish date</label>
                <label>{book.PublishDate.toString()}</label>
              </div>
              <div  className='section'>
                <label className="quantity-label" >Quantity</label>
                <label>{book.Quantity}</label>
              </div>
            </div>

          </div>
          <div className='card-buttons'>
            {
              userRole && (isUserAdmin(userRole) || isUserLibrarian(userRole)) ?
                <>
                  <button className='detail-button'>
                    <EditIcon onClick={() => setShowEditModal((show) => !show)} size={30}/>
                  </button>
                  { showEditModal &&
                    <EditBook closeEditModal={() => setShowEditModal(false)} bookId={book.Id}/>}
                  <button className='delete-button'>
                    <DeleteIcon onClick={() => setShowDeleteDialog(true)} size={30} />
                  </button>
                  <DeleteBook book = {book} deleteDialogRef={deleteDialogRef}
                    setShowDeleteDialog={setShowDeleteDialog}
                  />
                </>
                :
                <button className='detail-button'><RentIcon size={30}/></button>
            }

          </div>
        </> : <label> There is no book with id = {params.bookId}</label>
      }
    </div>
  )
}
export default BookDetail
