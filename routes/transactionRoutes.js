const express = require("express");

const transactionRouter = express.Router();

const {deposit} = require ("../controllers/transaction.controller");

transactionRouter.route("/deposit").post(deposit)

module.exports = transactionRouter