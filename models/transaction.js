const { Schema, model, Types } = require("mongoose");

var TransactionSchema = new Schema(
  {
    description: {
      type: String,
    },
    amount: {
      type: Number,
      require: true,
    },
    recipient: {
      type: Types.ObjectId,
      ref: "Account",
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      ref: "Account",
    },
    type: {
      type: String,
      enum: ["Debit", "Credit", "Reversal"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Transaction", TransactionSchema);
