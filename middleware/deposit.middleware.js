var Account = require('../models/account')

var accountNumber = (req,res,next) => {
    req.account = {accountID: Account.account_number, balance: Account.account_balance}
    next()
} 
module.exports = accountNumber