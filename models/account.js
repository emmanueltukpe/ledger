const mongoose = require('mongoose')

var AccountSchema = new mongoose.Schema({
  account_name: {
    type: String,
    required: [true, "please provide your name"]
  },
  account_number: {
    type: String,
    unique: true,
    maxlength: 10,
    minlengeth: 10,
  },
  account_balance: {
    type: Number,
    default: 0,
  },
  account_status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
});

module.exports = mongoose.model("Account", AccountSchema);
