//@ts-check
const express = require("express");

const accountRouter = express.Router();

const {
  createAccount,
  updateAccount,
  disableAccount,
  getAccounts,
} = require("../controllers/accounts.controller");

accountRouter.get("/", getAccounts);
accountRouter.post("/", createAccount);
accountRouter.put("/:id", updateAccount);
accountRouter.put("/disable/:id", disableAccount);

module.exports = accountRouter;
