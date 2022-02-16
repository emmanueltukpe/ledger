const express = require("express");

const accountRouter = express.Router();

const {
  createAccount,
  updateAccount,
  disableAccount,
} = require("../controllers/account.controller");
accountRouter.route("/create").post(createAccount);
accountRouter.route("/edit/:id").put(updateAccount);
accountRouter.route("/disable/:id").put(disableAccount);
module.exports = accountRouter;
