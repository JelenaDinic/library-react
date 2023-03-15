import BookItem from './BookItem';

export default interface BookResponse{
    Items: BookItem[];
    TotalCount: number
}
