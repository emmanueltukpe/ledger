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
 * Checks if the amount requested in the account
 * If it is not there, it throws an error, if it is, it is debited
 * It debits the account using the account number
 * @param {String} account_number the account number of the account
 * @param {Number} amount the amount to be debited
 */
const debit = async (account_number, amount) => {
  const account = await Accounts.findOne({ account_number });
  if (account.account_balance < amount) {
    throw new BadRequestError("Insufficient Funds");
  } else {
    return await Accounts.findOneAndUpdate(
      { account_number },
      { $inc: { account_balance: -amount } },
      { new: true }
    );
  }
};

const transfer = async (req, res) => {
  await debit(req.body.sender, req.body.amount);
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
  await debit(req.body.sender, req.body.amount);
  const transaction = await Transaction.create(req.body);
  res.status(StatusCodes.CREATED).json({ transaction });
};

module.exports = { transfer, deposit, withdrawal };
