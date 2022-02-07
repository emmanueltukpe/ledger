import { Schema, model } from "mongoose";

var AccountSchema = new Schema({
  account_name: {
    type: String,
    required: [true, "please provide your name"],
  },
  account_number: {
    type: String,
    required: true,
  },
  account_balance: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Account", AccountSchema);
