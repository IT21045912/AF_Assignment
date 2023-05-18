const mongoose = require('mongoose');
const { Schema } = mongoose;

const FertilizerSchema = new Schema(
  {
    unit_price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    measurement_unit: {
      type: String,
      required: true,
    },
    image_path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Fertilizer = mongoose.model('Fertilizer', FertilizerSchema);
module.exports = Fertilizer;
