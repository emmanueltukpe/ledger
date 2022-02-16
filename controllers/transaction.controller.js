const Transaction = require("../models/transaction");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const deposit = async (req, res) => {
    req.body.recipient = req.account.accountID
    req.body.account.balance = req.body.amount + req.body.account.balance
    const transaction = await Transaction.create(req.body)
    res.status(StatusCodes.CREATED).json({ transaction });
}
 
module.exports = {deposit}