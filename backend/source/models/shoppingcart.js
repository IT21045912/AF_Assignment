const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({

  UserID: {
    type: String,
    required: true,
  },

  Items: {
    type: Array,
    required: true,
  },

  Total:{
    type: Number,
    required: true
  }

});

module.exports = mongoose.model("ShoppingCart",cartSchema);