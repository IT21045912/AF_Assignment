const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    item_id: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    order_placed_by: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', OrderSchema);
