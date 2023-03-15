import { useEffect, useRef, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import './HomePage.css'

import BookItem from '../../interfaces/BookItem'
import BooksRequest from '../../interfaces/BooksRequest'
import { getBooksPaged } from '../../services/book.service'
import BookList from '../bookList/BookList'

const initialPageLenght  = 12

interface Props {
  searchInput : string
}

function HomePage( { searchInput } : Props) {
  const [ bookList, setBookList ] = useState<BookItem[]>([])
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ hasMore, setHasMore ] = useState(false)
  const currentSearch = useRef<string>(searchInput)

  const addNextPage = () => {
    setPageNumber(pageNumber + 1)
  }

  const fetchBooks = () => {
    const booksRequest : BooksRequest = {
      PageNumber: pageNumber,
      PageLength: initialPageLenght,
      Where: [ { Field: 'Title', Value: searchInput, Operation: 2 } ] }
    getBooksPaged(booksRequest).then((response =>
    {
      setHasMore(pageNumber * initialPageLenght <= response.data.TotalCount)
      setBookList((bookList) => [ ...bookList, ...response.data.Items ])
    })).catch((error) => console.error(error))
  }

  useEffect(() => {
    if (currentSearch.current !== searchInput) {
      setBookList([])
      setPageNumber(1)
      currentSearch.current = searchInput
    }
    fetchBooks()
  }, [ pageNumber, searchInput ])


  return (
    <div className="home">
      <h1 className='available-title'>Available book</h1>
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
