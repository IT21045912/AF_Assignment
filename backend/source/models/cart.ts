import mongoose, { Schema } from 'mongoose';
import Icart from '../interfaces/cart';

const CartSchema: Schema = new Schema(
    {
        itemId : {
            type : String,
            required : true
        },
        itemName : {
            type : String,
            required : true
        },
        added_by : {
            type : String,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        },
        price : {
            type : Number,
            required : true
        }      
    },
    {
        timestamps: true
    }
);

export default mongoose.model<Icart>('Cart', CartSchema);
