//@ts-check
const express = require("express");

const accountRouter = express.Router();

const {
  createAccount,
  updateAccount,
  disableAccount,
  getAccounts,
  getAccountBalance,
} = require("../controllers/accounts.controller");

accountRouter.get("/", getAccounts);
accountRouter.post("/", createAccount);
accountRouter.put("/:id", updateAccount);
accountRouter.put("/disable/:id", disableAccount);
accountRouter.get("/:id", getAccountBalance);

module.exports = accountRouter;
