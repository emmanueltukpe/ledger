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
 * Checks if the amount requested in the account
 * If it is not there, it throws an error
 * @param {String} account_number the account number of the account
 * @param {Number} amount the amount to be debited
 */
const checksAccount = async (account_number, amount) => {
  const account = await Accounts.findOne({ account_number });
  if (account.account_balance < amount) {
    throw new BadRequestError("Insufficient Funds");
  }
};

const transfer = async (req, res) => {
  await checksAccount(req.body.sender, req.body.amount);
  debit(req.body.sender, req.body.amount);
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
  await checksAccount(req.body.sender, req.body.amount);
  debit(req.body.sender, req.body.amount);
  const transaction = await Transaction.create(req.body);
  res.status(StatusCodes.CREATED).json({ transaction });
};

const refund = async (req, res) => {
  const {
    params: { id: transactionID },
  } = req;
  const { description, amount, recipient, sender, type } = req.body;

  const oldTransaction = await Transaction.findById({ _id: transactionID });
  if (!oldTransaction) throw new NotFoundError("transaction doesn't exist");

  const transaction = await Transaction.create({
    description,
    amount,
    recipient,
    sender,
    type,
    reference_transaction: transactionID,
  });

  await checksAccount(req.body.sender, req.body.amount);
  debit(req.body.sender, req.body.amount);
  credit(req.body.recipient, req.body.amount);

  res.status(StatusCodes.CREATED).json({ transaction });
};

const transactionHistory = async (req, res) => {
  const { sender, recipient } = req.query;
  const queryObject = {};
  if (sender) {
    queryObject.sender = sender;
  }
  if (recipient) {
    queryObject.recipient = recipient;
  }
  const transactions = await Transaction.find(queryObject);
  res.status(StatusCodes.OK).json({ transactions });
};
module.exports = { transfer, deposit, withdrawal, transactionHistory, refund };
