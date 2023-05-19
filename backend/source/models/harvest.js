const mongoose = require('mongoose');
const { Schema } = mongoose;

const HarvestSchema = new Schema(
    {
        seller: {
            type: String,
            required: true
        },
        unit_price: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        measurement_unit: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        image_path: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Harvest', HarvestSchema);
