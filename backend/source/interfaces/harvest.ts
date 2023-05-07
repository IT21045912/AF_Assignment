import { Document } from 'mongoose';

export default interface IHarvest extends Document {
    _id: string,
    seller: string,
    unit_price: number,
    name: string,
    measurement_unit: string,
    category: string,
    quantity: number,
    image_path: string,
}
