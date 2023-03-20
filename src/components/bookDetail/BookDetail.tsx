import { createRef, useEffect, useState } from 'react'

import jwtDecode from 'jwt-decode'
import { BiEditAlt as EditIcon } from 'react-icons/bi'
import { BsBookmarkCheck as RentIcon } from 'react-icons/bs'
import { RiDeleteBin6Line as DeleteIcon } from 'react-icons/ri'
import { useParams } from 'react-router-dom'


import noCover from '../../assets/no-cover.png'
import { Jwt, roleKey } from '../../interfaces/Jwt'
import SingleBookResponse from '../../interfaces/SingleBookResponse'
import bookService from '../../services/book.service'
import { getToken } from '../../services/token.service'
import { isUserAdmin } from '../../utilities/roles'
import DeleteBook from '../deleteBook/DeleteBook'
import EditBook from '../editBook/EditBook'

function BookDetail() {
  const [ isAdmin, setIsAdmin ]  = useState(false)
  const [ cover, setCover ] = useState(noCover)
  const [ showEditModal, setShowEditModal ] = useState(false)
  const [ showDeleteModal, setShowDeleteModal ] = useState(false)
  const [ book, setBook ] = useState<SingleBookResponse | null>(null)
  const deleteDialogRef = createRef<HTMLDialogElement>()
  const params= useParams()

  useEffect(() => {
    const token = getToken()
    if(token) {
      setIsAdmin(isUserAdmin(jwtDecode<Jwt>(token)[roleKey]))
      if (params.bookId) {
        bookService.getBookById(parseInt(params.bookId)).then((response) => {
          setBook(response.data)
          if(response.data.Cover) {
            setCover('data:image/png;base64,' + response.data.Cover)
          }
        }).catch(error => alert(error))
      }
    }
    showDeleteModal ?
      deleteDialogRef.current?.showModal() :
      deleteDialogRef.current?.close()
  }, [ showDeleteModal ])


  return (
    <div className="single-card">
      {book &&
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
                    <label className="desc-label" >Description</label>
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
                  isAdmin ?
                    <>
                      <button className='detail-button'>
                        <EditIcon onClick={() => setShowEditModal((show) => !show)} size={30}/>
                      </button>
                      { showEditModal &&
                    <EditBook closeEditModal={() => setShowEditModal(false)} bookId={book.Id}/>}
                      <button className='delete-button'>
                        <DeleteIcon onClick={() => setShowDeleteModal(true)} size={30} />
                      </button>
                      <DeleteBook bookId = {book.Id} deleteDialogRef={deleteDialogRef}
                        setShowDeleteDialog={setShowDeleteModal}
                      />
                    </>
                    :
                    <button className='detail-button'><RentIcon size={30}/></button>
                }

              </div>
            </>
      }
    </div>
  )
}
export default BookDetail
