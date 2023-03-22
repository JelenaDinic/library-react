export default interface BookRentalResponse{
    Id: number;
    Title: string;
    Description: string;
    Isbn: string;
    Cover?: string;
    PublishDate: string;
    RentCount: number
}
