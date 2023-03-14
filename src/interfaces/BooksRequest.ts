import WhereObject from './WhereObject'

export default interface BooksRequest{
    Where: WhereObject[],
    Order: string[],
    PageNumber: number,
    PageLength: number
}
