import { useEffect, useState } from 'react'

import { AxiosResponse } from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

import BookItem from '../../interfaces/BookItem'
import BookResponse from '../../interfaces/BookResponse'
import BooksRequest from '../../interfaces/BooksRequest'
import WhereObject from '../../interfaces/WhereObject'
import bookService from '../../services/book.service'
import BookList from '../bookList/BookList'
import './HomePage.css'

const initialPageLenght  = 12

interface Props {
  searchInput : string
  filters : WhereObject[]
  sorting: string[]
}

function HomePage( { searchInput, filters, sorting } : Props) {
  const [ bookList, setBookList ] = useState<BookItem[]>([])
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ hasMore, setHasMore ] = useState(false)
  const [ currentSearch, setCurrentSearch ] = useState<string>(searchInput)
  const [ currentFilters, setCurrentFilters ] = useState<WhereObject[]>(filters)
  const [ currentSorts, setCurrentSorts ] = useState<string[]>(sorting)


  const addNextPage = () => {
    setPageNumber(pageNumber + 1)
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
  }, [ pageNumber, searchInput, filters, sorting ])


  return (
    <div className="home">
      <h1 className='available-title'>Available books</h1>
      <InfiniteScroll
        dataLength={bookList.length}
        next={addNextPage}
        hasMore={hasMore}
        loader={<h3 className='loading'>Loading...</h3>}
        scrollThreshold='80%'
      ><BookList bookList={bookList}/>
      </InfiniteScroll>
    </div>
  )
}

export default HomePage
