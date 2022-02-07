import { Schema, model, Types } from "mongoose";

var TransactionSchema = new Schema(
  {
    description: {
      type: String
    },
    amount: {
      type: Number,
      require: true,
    },
    recipient: {
      type: Number,
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      ref: "Account",
      required: true,
    },
    type: {
        type: String,
        enum: ['Debit', 'Credit', 'Reversal'],
        required: true
    }
  },
  { timestamps: true }
);

module.exports = model('Transaction', TransactionSchema)