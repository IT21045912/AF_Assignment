import { Document } from 'mongoose';

export default interface IFertilizer extends Document {
    _id: string,
    unit_price: number,
    name: string,
    contents: string,
    measurement_unit: string,
    image_path: string,
}
