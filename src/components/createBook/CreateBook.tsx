
import { ChangeEvent, useEffect, useState } from 'react'

import { MdAddCircleOutline as AddIcon } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Select, { MultiValue } from 'react-select'

import noCover from '../../assets/no-cover.png'
import AuthorResponse from '../../interfaces/AuthorResponse'
import Book from '../../interfaces/Book'
import { getAuthors } from '../../services/author.service'
import { create } from '../../services/book.service'
import CreateAuthor from '../createAuthor/CreateAuthor'
import './CreateBook.css'

const initialBook: Book = { Title: '', ISBN: '', Quantity: 0, AuthorsIds: [], Description: '', PublishDate: '' }

function CreateBook() {
  const [ authorList, setAuthorList ] = useState<AuthorResponse[]>([])
  const [ selectedAuthors, setSelectedAuthors ] = useState<AuthorResponse[]>([])
  const [ isAuthorsChanged, setIsAuthorsChanged ] = useState(false)
  const [ cover, setCover ] = useState(noCover)
  const [ show, setShow ] = useState(false)
  const [ titleErrorMessage, setTitleErrorMessage ] = useState ('')
  const [ ISBNErrorMessage, setISBNErrorMessage ] = useState ('')
  const [ quantityErrorMessage, setQuantityErrorMessage ] = useState ('')
  const [ requestCover, setRequestCover ] = useState<Blob>(new Blob)
  const [ book, setBook ] = useState<Book>(initialBook)
  const navigate = useNavigate()

  useEffect(() => {
    fetchAuthors()
  }, [ isAuthorsChanged ])

  const fetchAuthors = () => {
    getAuthors().then(response => {
      setAuthorList(response.data)
    }).catch(error => {console.error(error)})
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files
    const reader = new FileReader()
    if(files!= null) {
      reader.readAsDataURL(files[0])
      setRequestCover(files[0])
      reader.onloadend = function () {
        const base64data = reader.result
        if(base64data)
          setCover(base64data as string)
      }
    }
  }

  const handleSelectedAuthorsChange = (authorsData: MultiValue<AuthorResponse>) => {
    setSelectedAuthors(authorsData as AuthorResponse[])
  }

  const createBook = () => {
    if(validateInput()) {
      create(prepareFormData())
        .then(() => {navigate('/Books')})
        .catch(error => {console.error(error)})
    }
  }

  const prepareFormData = () : FormData => {
    const formData = new FormData()
    formData.append('Title', book.Title)
    formData.append('Cover', requestCover)
    formData.append('Description', book.Description)
    formData.append('Quantity', book.Quantity.toString())
    formData.append('ISBN', book.ISBN)
    formData.append('PublishDate', book.PublishDate)
    selectedAuthors.forEach(author => formData.append('AuthorIds', author.Id.toString()))
    return formData
  }

  const validateInput = () : boolean=> {
    const isTitleInvalid = book.Title.trim() === ''
    if (isTitleInvalid) {
      setTitleErrorMessage('Title is required.')
    }
    const isQuantityInvalid = book.Quantity < 1
    if (isQuantityInvalid) {
      setQuantityErrorMessage('Minimum quantity is 1.')
    }
    const isbnRegex = new RegExp('^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$')
    const isIsbnInvalid = book.ISBN.trim() === '' || !isbnRegex.test(book.ISBN)
    if (isIsbnInvalid) {
      setISBNErrorMessage('ISBN is required and must contains ten numbers')
    }
    if(isIsbnInvalid || isQuantityInvalid || isTitleInvalid)
      return false

    return true
  }

  return (
    <div className="single-card">
      <div className='all-inputs'>
        <div className='cover-section'>
          <div  className='section'>
            <img className= "cover" src={cover}/>
            <input type="file" onChange={(event) => handleImageChange(event)}/>
          </div>
        </div>
        <div className='forms-sections'>
          <div  className='section'>
            <label className="name-label" >Title</label>
            <input className = "form-input" type="text"
              onChange={(e) => setBook(prevState => ({ ...prevState, Title: e.target.value }))}
            />
            <label className='error-message'>{titleErrorMessage}</label>
          </div>
          <div className='section'>
            <label className="isbn-label" >ISBN</label>
            <input className = "form-input" type="text"
              onChange={(e) => setBook(prevState => ({ ...prevState, ISBN: e.target.value }))}
            />
            <label className='error-message'>{ISBNErrorMessage}</label>
          </div>
          <div  className='section'>
            <label className="desc-label" >Description</label>
            <textarea className = "form-input" rows={3}
              onChange={(e) => setBook(prevState => ({ ...prevState, Description: e.target.value }))}
            />
          </div>
          <div  className='section' >

            <label className="authors-label" >Authors</label>
            <div className='author-section'>
              <Select
                isMulti
                className="authors-select"
                maxMenuHeight={200}
                value={selectedAuthors}
                options={authorList}
                classNamePrefix="select"
                getOptionLabel={(option: AuthorResponse) => `${option.FirstName} ${option.LastName}`}
                getOptionValue={(option: AuthorResponse) => option.Id.toString()}
                onChange={handleSelectedAuthorsChange}
              />
              <button className='add-btn' onClick={() => setShow((s) => !s)}><AddIcon className = "icon" size={40} color="#fce4db" /></button>
              { show && <CreateAuthor setIsAuthorsChanged={setIsAuthorsChanged} closeModal={() => setShow(false)}/>}
            </div>
          </div>
          <div className='section'>
            <label className="date-label" >Publish date</label>
            <input className = "form-input" type="date"
              onChange={(e) => setBook(prevState => ({ ...prevState, PublishDate: e.target.value }))}
            />
          </div>
          <div  className='section'>
            <label className="quantity-label" >Quantity</label>
            <input className = "form-input" type="number" min={0}
              onChange={(e) => setBook(prevState => ({ ...prevState, Quantity: parseInt(e.target.value) }))}
            />
            <label className='error-message'>{quantityErrorMessage}</label>
          </div>
        </div>

      </div>
      <button onClick={createBook}>Create</button>
    </div>
  )
}
export default CreateBook
