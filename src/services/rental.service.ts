import { baseAxios } from './api.service'

const rentBook = (bookId: number) => baseAxios.post('/Rental/rent/' + bookId.toString())
const returnBook = (bookId: number) => baseAxios.post('/Rental/return/' + bookId.toString())

export default {
  rentBook,
  returnBook
}
