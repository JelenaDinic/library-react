import { Dispatch, SetStateAction, useState } from 'react'

import AuthorRequest from '../../interfaces/AuthorRequest'
import { createAuthor } from '../../services/author.service'
import './CreateAuthor.css'

function CreateAuthorModal(props: {show : boolean, closeModal: () => void, setIsAuthorsChanged : Dispatch<SetStateAction<boolean>>}) {
  const [ author, setAuthor ] = useState<AuthorRequest>({ FirstName: '', LastName: '' })
  const [ errorMessage, setErrorMessage ] = useState('')

  const create = () => {
    if(validate()) {
      createAuthor(author).then(() => {
        props.closeModal()
        props.setIsAuthorsChanged(true)
      })
        .catch(() => {setErrorMessage('Unable to create new author.')})
    }
  }
  const validate = () : boolean => {
    if(author.FirstName.trim() === '' || author.LastName.trim() === '') {
      setErrorMessage('Please fill all the fields.')
      return false
    }
    return true
  }

  if (!props.show) return null
  return(
    <div className="modal">
      <div className="overlay" onClick={props.closeModal}/>
      <div className="content">
        <h2>Add new author</h2>
        <div  className='section'>
          <label className="fn-label" >Firstname</label>
          <input className = "form-input" type="text"
            onChange={(e) => setAuthor(prevState => ({ ...prevState, FirstName: e.target.value }))}
          />
        </div>
        <div className='section'>
          <label className="ln-label" >Lastname</label>
          <input className = "form-input" type="text"
            onChange={(e) => setAuthor(prevState => ({ ...prevState, LastName: e.target.value }))}
          />
        </div>
        <label className='error-message'>{errorMessage}</label>
        <div className='author-btns'>
          <button onClick={create}>Create </button>
          <button className= 'cancel-btn' onClick={props.closeModal}>Cancel </button>
        </div>
      </div>

    </div>
  )
}

export default CreateAuthorModal
