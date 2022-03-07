const { Schema, model, Types } = require("mongoose");

var TransactionSchema = new Schema(
  {
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    recipient: {
      type: String,
      ref: "Account",
    },
    sender: {
      type: String,
      ref: "Account",
    },
    type: {
      type: String,
      enum: ["Debit", "Credit", "Reversal"],
      required: true,
    },
    reference_transaction: {
      type: Types.ObjectId,
      ref: "Transaction",
      required: true,
      default: null
    },
  },
  { timestamps: true }
);

module.exports = model("Transaction", TransactionSchema);
