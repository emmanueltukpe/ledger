//@ts-check
const Transaction = require("../models/transaction");
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

/**
 * Debits an account by an amount
 *
 * @param {String} account_number the account number of the account to be debited
 * @param {Number} amount the amount to be debited
 */
const accountCheck = async (account_number, amount) => {
  const check = await Accounts.findOne({ account_number });
  if (check.account_balance < amount) {
    throw new BadRequestError("Insufficient Funds");
  } else {
    debit(account_number, amount);
  }
};

const transfer = async (req, res) => {
  // debit the sender
  // credit the recipient
  // create the transaction
  // return a response ot throw and error
  await accountCheck(req.body.sender, req.body.amount);
  credit(req.body.recipient, req.body.amount);
  const transaction = await Transaction.create(req.body);

  res.status(StatusCodes.CREATED).json({ transaction });
};

const deposit = async (req, res) => {
  const transaction = await Transaction.create(req.body);
  credit(req.body.recipient, req.body.amount);
  res.status(StatusCodes.CREATED).json({ transaction });
};

const withdrawal = async (req, res) => {
  const transaction = await Transaction.create(req.body);
  await accountCheck(req.body.sender, req.body.amount);
  res.status(StatusCodes.CREATED).json({ transaction });
};

module.exports = { transfer, deposit, withdrawal };
