import { useEffect, useState } from 'react'

import { AxiosResponse } from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import BookItem from '../../interfaces/BookItem'
import BookRentalResponse from '../../interfaces/BookRentalResponse'
import BookResponse from '../../interfaces/BookResponse'
import BooksRequest from '../../interfaces/BooksRequest'
import { UserRole } from '../../interfaces/Jwt'
import WhereObject from '../../interfaces/WhereObject'
import bookService from '../../services/book.service'
import rentalService from '../../services/rental.service'
import BookList from '../bookList/BookList'
import './HomePage.css'

const initialPageLenght  = 12

interface Props {
  searchInput : string
  filters : WhereObject[]
  sorting: string[]
  userRole?: UserRole
}

function HomePage( { searchInput, filters, sorting, userRole } : Props) {
  const [ bookList, setBookList ] = useState<BookItem[]>([])
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ hasMore, setHasMore ] = useState(false)
  const [ currentSearch, setCurrentSearch ] = useState<string>(searchInput)
  const [ currentFilters, setCurrentFilters ] = useState<WhereObject[]>(filters)
  const [ currentSorts, setCurrentSorts ] = useState<string[]>(sorting)
  const [ mostRentedBooks, setMostRentedBooks ] = useState<BookRentalResponse[]>([])


  const addNextPage = () => {
    setPageNumber(pageNumber + 1)
  }

  const fetchMostRentedBooks = () => {
    rentalService.getTopRentals(10).then((response) =>
    {
      setMostRentedBooks(response.data)
    }).catch((error) => console.error(error))
  }

  const fetchBooks = () => {
    const booksRequest : BooksRequest = {
      PageNumber: pageNumber,
      PageLength: initialPageLenght,
      Where: [ ...filters, ...[ { Field: 'Title', Value: searchInput, Operation: 2 } ] ],
      Order: sorting
    }
    bookService.getBooksPaged(booksRequest).then((response:AxiosResponse<BookResponse>) =>
    {
      setHasMore(pageNumber * initialPageLenght <= response.data.TotalCount)
      setBookList((bookList) => [ ...bookList, ...response.data.Items ])
    }).catch((error) => console.error(error))
  }

  useEffect(() => {
    if (currentSearch !== searchInput) {
      setBookList([])
      setPageNumber(1)
      setCurrentSearch(searchInput)
    }
    if (currentFilters !== filters) {
      setBookList([])
      setPageNumber(1)
      setCurrentFilters(filters)
    }
    if (currentSorts !== sorting) {
      setBookList([])
      setPageNumber(1)
      setCurrentSorts(sorting)
    }
    fetchBooks()
    fetchMostRentedBooks()
  }, [ pageNumber, searchInput, filters, sorting ])

  const onModifyFinished = () => {
    const booksRequest : BooksRequest = {
      PageNumber: pageNumber,
      PageLength: initialPageLenght,
      Where: [ ...filters, ...[ { Field: 'Title', Value: searchInput, Operation: 2 } ] ],
      Order: sorting
    }
    bookService.getBooksPaged(booksRequest).then((response:AxiosResponse<BookResponse>) =>
    {
      setHasMore(pageNumber * initialPageLenght <= response.data.TotalCount)
      setBookList(response.data.Items)
    }).catch((error) => console.error(error))
  }


  return (
    <div className='main-page'>
      <div className='most-rented'>
        <h1 className='available-title'>TOP 10 MOST RENTED BOOKS</h1>
        <Carousel className='carousel-root'>
          {mostRentedBooks.map(book => {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            const cover = 'data:image/png;base64,' + book.Cover
            return <div key={book.Id} className="carousel-div"><h2 className='carousel-title'>{book.Title}</h2><img className="carousel-imgs" src={cover}/> </div>
          })}
        </Carousel>
      </div>
      <div className="home">
        <h1 className='available-title'>Available books</h1>
        <InfiniteScroll
          dataLength={bookList.length}
          next={addNextPage}
          hasMore={hasMore}
          loader={<h3 className='loading'>Loading...</h3>}
          scrollThreshold='80%'
        ><BookList onModifyFinished={onModifyFinished} userRole={userRole} bookList={bookList} />
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default HomePage
