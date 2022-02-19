//@ts-check
const express = require("express");

const transactionRouter = express.Router();

const { transfer } = require("../controllers/transfers.controller");

transactionRouter.post("/", transfer);

module.exports = transactionRouter;
