//@ts-check
const express = require("express");
const {
  createAccount,
  updateAccount,
  disableAccount,
} = require("../controllers/account.controller");

const router = express.Router();

router.route("/create").post(createAccount);
router.route("/edit/:id").put(updateAccount);
router.route("/disable/:id").put(disableAccount);
module.exports = router;
