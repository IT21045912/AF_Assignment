import mongoose, { Schema } from 'mongoose';
import IHarvest from '../interfaces/harvest';

const HarvestSchema: Schema = new Schema(
    {
        seller : {
            type : String,
            required : true
        },
        unit_price : {
            type : Number,
            required : true
        },
        name : {
            type : String,
            required : true
        },
        measurement_unit : {
            type : String,
            required : true
        },
        category : {
            type : String,
            required : true
        },
        image_path : {
            type : String,
            required : true
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IHarvest>('Harvest', HarvestSchema);
