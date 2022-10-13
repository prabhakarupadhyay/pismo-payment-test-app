// check request body for the account
// The same script can be modified to check multiple body params for other apis

const { check } = require("express-validator");

exports.accounts = [
  check("document_number").not().isEmpty().withMessage("document number is required")
];

exports.transactions = [
  check("account_id").not().isEmpty().isInt().withMessage("account id is required"),
  check("operation_type_id").not().isEmpty().isInt().withMessage("operation id is required"),
  check("amount").not().isEmpty().trim().toFloat().isFloat({ min: 1 }).withMessage("amount is required above minimum value 1")
];
