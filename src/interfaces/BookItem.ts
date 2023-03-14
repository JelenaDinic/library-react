import AuthorRequest from './AuthorRequest';

export default interface BookItem{
    Id: number;
    Title: string;
    Description: string;
    Isbn: string;
    Quantity: number;
    Cover?: string;
    PublishDate: string;
    Authors: AuthorRequest[]
}
