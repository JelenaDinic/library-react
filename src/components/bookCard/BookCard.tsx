import { useEffect, useState } from 'react'

import jwtDecode from 'jwt-decode'
import { BiDetail as DetailIcon, BiEditAlt as EditIcon } from 'react-icons/bi'
import { BsBookmarkCheck as RentIcon } from 'react-icons/bs'
import { RiDeleteBin6Line as DeleteIcon } from 'react-icons/ri'

import noCover from '../../assets/no-cover.png'
import BookItem from '../../interfaces/BookItem'
import { Jwt, roleKey } from '../../interfaces/Jwt'
import { getToken } from '../../services/token.service'
import { isUserAdmin } from '../../utilities/roles'
import EditBook from '../editBook/EditBook'
import './BookCard.css'



interface Props {
  book: BookItem
}

function BookCard({ book }: Props) {
  const [ isAdmin, setIsAdmin ]  = useState(false)
  const [ showEditModal, setShowEditModal ] = useState(false)

  useEffect(() => {
    const token = getToken()
    if(token) {
      setIsAdmin(isUserAdmin(jwtDecode<Jwt>(token)[roleKey]))
    }
  }, [])

  return (
    <div className="card">
      <img className= "card-cover" src={book.Cover ? 'data:image/png;base64,' + book.Cover : noCover}/>
      <h2 className='card-title'>{book.Title} </h2>
      <p>
        {book.Authors.map((author) => `${author.FirstName} ${author.LastName}`).join(', ')}
      </p>
      <label className="isbn-label" >ISBN : {book.Isbn} </label>
      <div className='card-buttons'>
        <button className='detail-button'><DetailIcon size={30} /></button>
        {
          isAdmin ?
            <>
              <button className='detail-button'>
                <EditIcon onClick={() => setShowEditModal((show) => !show)} size={30}/>
              </button>
              { showEditModal &&
              <EditBook closeEditModal={() => setShowEditModal(false)} bookId={book.Id}/>}
              <button className='delete-button'><DeleteIcon size={30} /></button>
            </>
            :
            <button className='detail-button'><RentIcon size={30}/></button>
        }

      </div>
    </div>
  )
}
export default BookCard
