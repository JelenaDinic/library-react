import { ChangeEvent, useEffect, useState } from 'react'

import { MdAddCircleOutline as AddIcon } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Select, { MultiValue } from 'react-select'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import noCover from '../../assets/no-cover.png'
import AuthorResponse from '../../interfaces/AuthorResponse'
import Book from '../../interfaces/Book'
import SingleBookRequest from '../../interfaces/SingleBookRequest'
import authorService from '../../services/author.service'
import bookService from '../../services/book.service'
import CreateAuthor from '../createAuthor/CreateAuthor'
import './BookForm.css'

const initialBook: Book = { Title: '', ISBN: '', Quantity: 0, AuthorsIds: [], Description: '', PublishDate: '' }
const initialUpdatedBook: SingleBookRequest = { Id: 0, Title: '', ISBN: '', Quantity: 0, Description: '', PublishDate: '' }

interface Props {
  bookId?: number
  closeEditModal: () => void;
  onModifyFinished?: () => void
}

function BookForm({ bookId, closeEditModal, onModifyFinished } : Props) {
  const [ authorList, setAuthorList ] = useState<AuthorResponse[]>([])
  const [ selectedAuthors, setSelectedAuthors ] = useState<AuthorResponse[]>([])
  const [ isAuthorsChanged, setIsAuthorsChanged ] = useState(false)
  const [ cover, setCover ] = useState(noCover)
  const [ showModal, setShowModal ] = useState(false)
  const [ titleErrorMessage, setTitleErrorMessage ] = useState ('')
  const [ ISBNErrorMessage, setISBNErrorMessage ] = useState ('')
  const [ quantityErrorMessage, setQuantityErrorMessage ] = useState ('')
  const [ requestCover, setRequestCover ] = useState<Blob>(new Blob)
  const [ book, setBook ] = useState<Book>(initialBook)
  const [ updatedBook, setUpdatedBook ] = useState<SingleBookRequest>(initialUpdatedBook)
  const navigate = useNavigate()

  const convertBase64ToBlob = (base64Image: string): Blob => {
    const parts = base64Image.split(';base64,')
    const imageType = parts[0].split(':')[1]
    const decodedData = window.atob(parts[1])
    const uInt8Array = new Uint8Array(decodedData.length)
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    return new Blob([ uInt8Array ], { type: imageType })
  }

  const mapBook = (bookId : number) => {
    bookService.getBookById(bookId).then((response) => {
      setUpdatedBook({
        Id: bookId,
        Title: response.data?.Title,
        ISBN: response.data?.ISBN,
        Quantity: response.data?.Quantity,
        Description: response.data?.Description,
        Cover: response.data.Cover,
        PublishDate: response.data?.PublishDate?.toString(),
        AuthorIds: response.data.Authors?.map((author) => author.Id)
      })
      setBook({
        Title: response.data?.Title,
        ISBN: response.data?.ISBN,
        Quantity: response.data?.Quantity,
        Description: response.data?.Description,
        PublishDate: response.data?.PublishDate?.toString(),
        AuthorsIds: response.data.Authors?.map((author) => author.Id)
      })
      const selectedAuthors : AuthorResponse[] = []
      response.data.Authors.forEach(author =>
        selectedAuthors.push({
          Id: author.Id,
          FirstName: author.Firstname,
          LastName: author.Lastname
        }))
      setSelectedAuthors(selectedAuthors)
      if(response.data.Cover) {
        setCover('data:image/png;base64,' + response.data.Cover)
        setRequestCover(convertBase64ToBlob('data:image/png;base64,' + response.data.Cover))
      }
    }).catch(error => alert(error))
  }

  useEffect(() => {
    bookId && mapBook(bookId)
    fetchAuthors()
  }, [ isAuthorsChanged ])

  const fetchAuthors = () => {
    authorService.getAuthors().then(response => {
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
  const handleBookFormSubmit = () => {
    (bookId)  ? updateBook() : createBook()
  }

  const updateBook = () => {
    if(validateInput()) {
      bookService.updateBook(prepareUpdateFormData())
        .then(() => {
          closeEditModal()
          onModifyFinished && onModifyFinished()
        })
        .catch(error => {console.error(error)})
    }
  }

  const createBook = () => {
    if(validateInput()) {
      bookService.createBook(prepareFormData())
        .then(() => {
          onModifyFinished && onModifyFinished()
          navigate('/')
        })
        .catch(error => {console.error(error)})
    }
  }

  const prepareUpdateFormData = () : FormData => {
    const formData = new FormData()
    if(updatedBook) {
      formData.append('Id', updatedBook.Id.toString())
      formData.append('Title', updatedBook.Title)
      formData.append('Cover', requestCover)
      formData.append('Description', updatedBook.Description)
      formData.append('Quantity', updatedBook.Quantity.toString())
      formData.append('ISBN', updatedBook.ISBN)
      formData.append('PublishDate', new Intl.DateTimeFormat('en-US').format(new Date(updatedBook.PublishDate)))
      selectedAuthors.forEach(author => formData.append('AuthorIds', author.Id.toString()))
    }
    return formData
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
      <ToastContainer />
      <div className='all-inputs'>
        <div className='cover-section'>
          <div  className='section'>
            <img className="cover" src={cover}/>
            <input type="file" onChange={(event) => handleImageChange(event)}/>
          </div>
        </div>
        <div className='forms-sections'>
          <div  className='section'>
            <label className="name-label" >Title</label>
            <input className="form-input" type="text" value={book.Title}
              onChange={(e) => {
                setBook(prevState => ({ ...prevState, Title: e.target.value }))
                setUpdatedBook(prevState => ({ ...prevState, Title: e.target.value }))
              }}
            />
            <label className='error-message'>{titleErrorMessage}</label>
          </div>
          <div className='section'>
            <label className="isbn-label" >ISBN</label>
            <input className="form-input" type="text" value={book.ISBN}
              onChange={(e) => {
                setBook(prevState => ({ ...prevState, ISBN: e.target.value }))
                setUpdatedBook(prevState => ({ ...prevState, ISBN: e.target.value }))
              }}
            />
            <label className='error-message'>{ISBNErrorMessage}</label>
          </div>
          <div  className='section'>
            <label className="desc-label" >Description</label>
            <textarea className="form-input" rows={3} value={book.Description}
              onChange={(e) => {
                setBook(prevState => ({ ...prevState, Description: e.target.value }))
                setUpdatedBook(prevState => ({ ...prevState, Description: e.target.value }))

              }}
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
              <button className='add-btn'
                onClick={() => setShowModal((show) => !show)}
              >
                <AddIcon className = "icon" size={40} color="#fce4db" />
              </button>
              { showModal && <CreateAuthor setIsAuthorsChanged={setIsAuthorsChanged} closeModal={() => setShowModal(false)}/>}
            </div>
          </div>
          <div className='section'>
            <label className="date-label" >Publish date</label>
            <input className ="form-input"
              type="date"
              value={book.PublishDate ? new Intl.DateTimeFormat('en-CA').format(new Date(book.PublishDate)) : ''}
              onChange={(e) => {
                setBook(prevState => ({ ...prevState, PublishDate: e.target.value }))
                setUpdatedBook(prevState => ({ ...prevState, PublishDate: e.target.value }))
              }}
            />
          </div>
          <div  className='section'>
            <label className="quantity-label" >Quantity</label>
            <input className="form-input" type="number" min={0} value={book.Quantity}
              onChange={(e) => {
                setBook(prevState => ({ ...prevState, Quantity: parseInt(e.target.value) }))
                setUpdatedBook(prevState => ({ ...prevState, Quantity: parseInt(e.target.value) }))
              }}
            />
            <label className='error-message'>{quantityErrorMessage}</label>
          </div>
        </div>

      </div>
      <button onClick={handleBookFormSubmit}>{bookId ? 'Update' : 'Create'}</button>
    </div>
  )
}
export default BookForm
