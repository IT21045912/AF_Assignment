import { Document } from 'mongoose';

export default interface ICart extends Document {
    _id: string,
    itemId: string,
    itemName: string,
    added_by: string,
    quantity: number,
    price: number
}
