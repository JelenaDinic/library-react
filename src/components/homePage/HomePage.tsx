import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import BookItem from '../../interfaces/BookItem'
import BooksRequest from '../../interfaces/BooksRequest'
import { getBooksPaged } from '../../services/book.service'
import BookList from '../bookList/BookList'

function HomePage() {
  const [ bookList, setBookList ] = useState<BookItem[]>([])
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ hasMore, setHasMore ] = useState(false)

  useEffect(() => {
    setBookList([])
    getBooksPaged({ PageNumber: 1, PageLength: 12, Where: [ { Field: 'Title', Value: '', Operation: 2 } ] } as BooksRequest).then((response =>
    {
      setHasMore(response.data.length > 0)
      setBookList(response.data)
    })).catch((error) => console.error(error))
  }, [ ] )

  const addNextPage = () => {
    setPageNumber(pageNumber + 1)
  }


  return (
    <div>
      <InfiniteScroll
        dataLength={bookList.length}
        next={addNextPage}
        hasMore={hasMore}
        loader={<h3>Loading...</h3>}
        scrollThreshold='75%'
      ><BookList bookList={bookList}/>
      </InfiniteScroll>
    </div>
  )
}

export default HomePage
