//@ts-check
const Account = require("../models/account");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createAccount = async (req, res) => {
  if (!req.body.account_name) {
    throw new BadRequestError(
      "Please provide a name for the account to be created"
    );
  }
  if (req.body.account_balance) {
    delete req.body.account_balance;
  }
  const account = await Account.create(req.body);
  res.status(StatusCodes.CREATED).json({ account });
};

const updateAccount = async (req, res) => {
  if (req.body.account_balance || req.body.account_status) {
    delete req.body.account_balance;
    delete req.body.account_status;
  }
  const update = req.body;
  const { id: accountID } = req.params;
  const account = await Account.findOneAndUpdate({ _id: accountID }, update, {
    new: true,
    runValidators: true,
  });
  if (!account) {
    throw new NotFoundError(`No account with id ${accountID}`);
  }
  res.status(StatusCodes.OK).json({ account });
};

const disableAccount = async (req, res) => {
  const {
    body: { account_status },
    params: { id: accountID },
  } = req;

  if (["Active", "Inactive"].includes(account_status)) {
    const account = await Account.findOneAndUpdate(
      { _id: accountID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!account) {
      throw new NotFoundError(`No account with id ${accountID}`);
    }
    res.status(StatusCodes.OK).json({ account });
  } else {
    throw new BadRequestError("Account can either be Active or Inactive");
  }
};

const getAccounts = async (req, res) => {
  const account = await Account.find();
  res.status(StatusCodes.OK).json({ account });
};

const getAccountBalance = async (req, res) => {
  const { id: accountNumber } = req.params;
  const account = await Account.findOne({ account_number: accountNumber });
  if (!account) {
    throw new NotFoundError(
      `account with account number (${accountNumber}) is not registered`
    );
  }
  res.status(StatusCodes.OK).json({ account });
};

module.exports = {
  createAccount,
  updateAccount,
  disableAccount,
  getAccounts,
  getAccountBalance,
};
