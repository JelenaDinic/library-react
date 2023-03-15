import { AxiosResponse } from 'axios'

import BookResponse from '../interfaces/BookResponse'
import BooksRequest from '../interfaces/BooksRequest'
import { baseAxios } from './api.service'

const paramsToUrl = (booksRequest: BooksRequest) => {
  let result = '?'
  result += 'PageNumber=' + booksRequest.PageNumber.toString()
  result += '&PageLength=' + booksRequest.PageLength.toString()
  booksRequest.Where?.forEach((where) => {
    if (where.Value !== '' && where.Value != null) {
      result += `&where=${JSON.stringify(where)}`
    }
  })
  booksRequest.Order?.forEach((order) => {
    if (order !== '')
      result += '&Order=' + order
  })
  return result
}

const create = (formData: FormData)  => baseAxios.post('/Books', formData)
const getBooksPaged = (booksRequest : BooksRequest) : Promise<AxiosResponse<BookResponse>>  => baseAxios.get<BookResponse>('/Books/paged' + paramsToUrl(booksRequest))

export default {
  create,
  getBooksPaged
}
