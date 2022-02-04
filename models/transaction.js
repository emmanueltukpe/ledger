import { Schema, model, Types } from "mongoose";

var TransactionSchema = new Schema(
  {
    descriptionOfTransaction: {
      type: String
    },
    valueOfTransaction: {
      type: Number,
      require: true,
    },
    clientAccount: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "Account",
      required: true,
    },
    typeOfTransaction: {
        type: String,
        enum: ['Debit', 'Credit', 'Reversal'],
        required: true
    }
  },
  { timestamps: true }
);

module.exports = model('Transaction', TransactionSchema)