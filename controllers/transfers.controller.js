//@ts-check
const Transactions = require("../models/transaction");
const Accounts = require("../models/account");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

/**
 * Credits an account by an amount
 *
 * @param {String} account_number the account number of the account to be credited
 * @param {Number} amount the amount to be credited
 */
const credit = async (account_number, amount) => {
  return await Accounts.findOneAndUpdate(
    { account_number },
    { $inc: { account_balance: amount } },
    { new: true }
  );
};

/**
 * Debits an account by an amount
 *
 * @param {String} account_number the account number of the account to be debited
 * @param {Number} amount the amount to be debited
 */
const debit = async (account_number, amount) => {
  return await Accounts.findOneAndUpdate(
    { account_number },
    { $inc: { account_balance: -amount } },
    { new: true }
  );
};

const transfer = async (req, res) => {
  // debit the sender
  // credit the recipient
  // create the transaction
  // return a response ot throw and error
};

module.exports = { transfer };
