import { AxiosResponse } from 'axios'

import BookHistoryResponse from '../interfaces/BookHistoryResponse'
import { baseAxios } from './api.service'

const rentBook = (bookId: number) => baseAxios.post('/Rental/rent/' + bookId.toString())
const returnBook = (rentId: number) => baseAxios.post('/Rental/return/' + rentId.toString() )
const getBookHistory = (bookId: number) : Promise<AxiosResponse<BookHistoryResponse[]>> => baseAxios.get('/Rental/book-history/' + bookId.toString())

export default {
  rentBook,
  returnBook,
  getBookHistory
}
