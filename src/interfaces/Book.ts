export default interface Book{
    Title: string;
    Description: string;
    ISBN: string;
    Quantity: number;
    Cover?: string;
    PublishDate: string;
    AuthorsIds: []
}
