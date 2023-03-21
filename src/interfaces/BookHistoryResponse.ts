import User from './User';

export default interface BookHistoryResponse{
    Id: number;
    User : User;
    RentDate: string;
    IsReturned: boolean
}
