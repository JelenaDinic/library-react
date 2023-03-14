import AuthorResponse from './AuthorResponse';

export default interface BookItem{
    Title: string;
    Description: string;
    ISBN: string;
    Quantity: number;
    Cover?: string;
    PublishDate: string;
    Authors: AuthorResponse[]
}
