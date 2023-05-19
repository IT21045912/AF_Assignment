const mongoose = require('mongoose');
const { Schema } = mongoose;

const LoanSchema = new Schema(
  {
    requested_by: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    special_notice: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Loan', LoanSchema);
