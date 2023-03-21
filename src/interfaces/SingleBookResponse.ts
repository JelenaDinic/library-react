import Author from './Author';

export default interface SingleBookResponse {
    Id : number;
    Title: string;
    Description: string;
    ISBN: string;
    Quantity: number;
    Available: number;
    Cover: string;
    PublishDate: Date;
    Authors: Author[]
}
