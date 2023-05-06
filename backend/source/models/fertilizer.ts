import mongoose, { Schema } from 'mongoose';
import IFertilizer from '../interfaces/fertilizer';

const FertlizerSchema: Schema = new Schema(
    {
        unit_price : {
            type : Number,
            required : true
        },
        name : {
            type : String,
            required : true
        },
        contents : {
            type : String,
            required : true
        },
        measurement_unit : {
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

export default mongoose.model<IFertilizer>('Fertilizer', FertlizerSchema);
