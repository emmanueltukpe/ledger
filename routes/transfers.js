//@ts-check
const express = require("express");

const transactionRouter = express.Router();

const {
  transfer,
  deposit,
  withdrawal,
} = require("../controllers/transfers.controller");

transactionRouter.post("/", transfer);
transactionRouter.post("/deposit", deposit)
transactionRouter.post("/withdrawal", withdrawal)
module.exports = transactionRouter;
