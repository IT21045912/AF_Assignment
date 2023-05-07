import mongoose, { Schema } from 'mongoose';
import ILoan from '../interfaces/loan';

const HarvestSchema: Schema = new Schema(
    {
        requested_by : {
            type : String,
            required : true
        },
        status : {
            type : Boolean,
            required : true
        },
        reason : {
            type : String,
            required : true
        },
        special_notice : {
            type : String,
        },
        amount : {
            type : Number,
            required : true
        },
        time : {
            type : String,
            required : true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ILoan>('Loan', HarvestSchema);
