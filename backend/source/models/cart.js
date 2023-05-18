const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    itemId: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    added_by: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
