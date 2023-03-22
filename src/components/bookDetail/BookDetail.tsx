import { createRef, useEffect, useState } from 'react'

import { BiEditAlt as EditIcon } from 'react-icons/bi'
import { BsBookmarkCheck as RentIcon } from 'react-icons/bs'
import { RiDeleteBin6Line as DeleteIcon } from 'react-icons/ri'
import { ThreeDots } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import noCover from '../../assets/no-cover.png'
import BookHistoryResponse from '../../interfaces/BookHistoryResponse'
import { UserRole } from '../../interfaces/Jwt'
import SingleBookResponse from '../../interfaces/SingleBookResponse'
import bookService from '../../services/book.service'
import rentalService from '../../services/rental.service'
import { isAdmin, isLibrarian } from '../../utilities/roles'
import DeleteBook from '../deleteBook/DeleteBook'
import EditBook from '../editBook/EditBook'

import './BookDetail.css'

interface Props {
  userRole?: UserRole
}

function BookDetail({ userRole }: Props) {
  const [ cover, setCover ] = useState(noCover)
  const [ showEditModal, setShowEditModal ] = useState(false)
  const [ showDeleteDialog, setShowDeleteDialog ] = useState(false)
  const [ book, setBook ] = useState<SingleBookResponse | null>(null)
  const [ bookHistory, setBookHistory ] = useState<BookHistoryResponse[]>([])
  const deleteDialogRef = createRef<HTMLDialogElement>()
  const params= useParams()
  const [ onBookUpdate, setOnBookUpdate ] = useState(false)

  useEffect(() => {
    fetchBookHistory()
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
  }, [ showDeleteDialog, onBookUpdate ])

  const updateBookOnChange = () => {
    setOnBookUpdate(!onBookUpdate)
  }

  const fetchBookHistory = () => {
    params.bookId && rentalService.getBookHistory(parseInt(params.bookId)).then(response => {
      setBookHistory(response.data)
    }).catch(error => console.error(error))
  }

  const rentBook = () => {
    params.bookId &&
    rentalService.rentBook(parseInt(params.bookId)).then(() => {
      toast.success('Successfully rented')
      fetchBookHistory()
      updateBookOnChange()
    }).catch((error) => {
      toast.error('An error occured.')
    })
  }

  const returnBook = ( rentId : number) => {
    params.bookId &&
    rentalService.returnBook(rentId).then(() => {
      toast.success('Successfully returned')
      updateBookOnChange()
      setBookHistory((previousState) =>  [ ...previousState.map(element => element.Id === rentId
        ? { ...element, IsReturned: true }
        : element
      ) ])
    }).catch((error) => {
      toast.error('An error occured.')
    })
  }


  return (
    <div className="single-card">
      <ToastContainer />
      {book ?
        <>
          <div className='all-inputs'>
            <div className='detail-cover-section'>
              <img className="cover" src={cover}/>
              { book.Available > 0 ?
                <div className='available'>
                  <label>AVAILABLE</label>
                </div> :
                <div className='not-available'>
                  <label>NOT AVAILABLE</label>
                </div>
              }

            </div>
            <div className='forms-sections'>
              <div  className='section'>
                <h1>{book.Title}</h1>
              </div>
              <div  className='section'>
                <label className='description-lable'>{book.Description ? book.Description : ''}</label>
              </div>
              <div className='section'>
                <label className="isbn-label" >ISBN</label>
                <label>{book.ISBN}</label>
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
                <label>{book.PublishDate ? new Intl.DateTimeFormat('en-CA').format(new Date(book.PublishDate)) : '/' }</label>
              </div>
            </div>

          </div>
          <div className='card-buttons'>
            {
              userRole && (isAdmin(userRole) || isLibrarian(userRole)) ?
                <>
                  <button className='detail-button'>
                    <EditIcon onClick={() => setShowEditModal((show) => !show)} size={30}/>
                  </button>
                  { showEditModal &&
                    <EditBook updateBookOnChange = {updateBookOnChange} closeEditModal={() => setShowEditModal(false)} bookId={book.Id}/>}
                  <button className='delete-button'>
                    <DeleteIcon onClick={() => setShowDeleteDialog(true)} size={30} />
                  </button>
                  <DeleteBook book = {book} deleteDialogRef={deleteDialogRef}
                    setShowDeleteDialog={setShowDeleteDialog}
                  />
                  {(book.Available > 0) && <button className='detail-button' onClick={rentBook}><RentIcon size={30}/></button>}
                </>
                :
                (book.Available > 0) && <button className='detail-button' onClick={rentBook}><RentIcon size={30}/></button>
            }

          </div>
        </> : <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#e58f23"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      }
      {
        bookHistory.length > 0 &&
        <>
          <h2>RENT HISTORY</h2>
          <table className='history-table'>
            <thead className='history-headers'>
              <tr className='headers'>
                <th className='history-header' scope='col'>Rent date</th>
                <th className='history-header' scope='col'>User</th>
                <th className='history-header' scope='col'>Returned?</th>
              </tr>
            </thead>
            <tbody>
              {
                bookHistory.map((bookRentHistory) => {
                  return (
                    <tr key={bookRentHistory.Id}>
                      <td className='cell-data'>
                        {bookRentHistory.RentDate ? new Intl.DateTimeFormat('en-CA').format(new Date(bookRentHistory.RentDate)) : '/' }
                      </td>
                      <td className='cell-data'>
                        {bookRentHistory.User.Email}
                      </td>
                      {
                        bookRentHistory.IsReturned ?
                          <td className='dell-data'>
                            Returned
                          </td> :
                          (
                            <td className='cell-data'>
                              <button onClick={() => returnBook(bookRentHistory.Id)}>Return</button>
                            </td>
                          )
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </>
      }
    </div>
  )
}
export default BookDetail
