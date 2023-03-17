import { Dispatch, SetStateAction, useState } from 'react';

import AuthorRequest from '../../interfaces/AuthorRequest';
import authorService from '../../services/author.service';
import './CreateAuthor.css';

interface Props {
  closeModal: () => void;
  setIsAuthorsChanged : Dispatch<SetStateAction<boolean>>
}

function CreateAuthor(props: Props) {
  const [ author, setAuthor ] = useState<AuthorRequest>({ FirstName: '', LastName: '' })
  const [ errorMessage, setErrorMessage ] = useState('')

  const createAuthor = () => {
    if(validateInput()) {
      authorService.createAuthor(author).then(() => {
        props.closeModal()
        props.setIsAuthorsChanged(true)
      })
        .catch(() => {setErrorMessage('Unable to create new author.')})
    }
  }
  const validateInput = () : boolean => {
    if(author.FirstName.trim() === '' || author.LastName.trim() === '') {
      setErrorMessage('Please fill all the fields.')
      return false
    }
    return true
  }

  return(
    <div className="modal">
      <div className="overlay" onClick={props.closeModal}/>
      <div className="content">
        <h2>Add new author</h2>
        <div  className='section'>
          <label className="firstname-label" >Firstname</label>
          <input className = "form-input" type="text"
            onChange={(e) => setAuthor(prevState => ({ ...prevState, FirstName: e.target.value }))}
          />
        </div>
        <div className='section'>
          <label className="lastname-label" >Lastname</label>
          <input className = "form-input" type="text"
            onChange={(e) => setAuthor(prevState => ({ ...prevState, LastName: e.target.value }))}
          />
        </div>
        {errorMessage && <label className='error-message'>{errorMessage}</label>}
        <div className='author-btns'>
          <button onClick={createAuthor}>Create </button>
          <button className= 'cancel-btn' onClick={props.closeModal}>Cancel </button>
        </div>
      </div>

    </div>
  )
}

export default CreateAuthor
