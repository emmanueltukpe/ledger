const express = require("express");

const router = express.Router();

const {
  createAccount,
  updateAccount,
  disableAccount,
} = require("../controllers/account.controller");
router.route("/create").post(createAccount);
router.route("/edit/:id").put(updateAccount);
router.route("/disable/:id").put(disableAccount);
module.exports = router;
