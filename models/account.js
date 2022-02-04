import { Schema, model } from "mongoose";

var AccountSchema = new Schema({
  accountName: {
    type: String,
    required: [true, "please provide your name"],
  },
  accountNumber: {
    type: String,
    required: true,
  },
  accountBalance: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Account", AccountSchema);
