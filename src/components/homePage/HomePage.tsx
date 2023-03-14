import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import './HomePage.css'

import BookItem from '../../interfaces/BookItem'
import { getBooksPaged } from '../../services/book.service'
import BookList from '../bookList/BookList'

const initialPageLenght  = 12

function HomePage() {
  const [ bookList, setBookList ] = useState<BookItem[]>([])
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ hasMore, setHasMore ] = useState(false)

  const addNextPage = () => {
    setPageNumber(pageNumber + 1)
  }

  useEffect(() => {
    getBooksPaged({ PageNumber: pageNumber, PageLength: initialPageLenght, Where: [ { Field: 'Title', Value: '', Operation: 2 } ] }).then((response =>
    {
      setHasMore(pageNumber * initialPageLenght <= response.data.TotalCount)
      setBookList([ ...bookList, ...response.data.Items ])
    })).catch((error) => console.error(error))
  }, [ pageNumber ])


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
