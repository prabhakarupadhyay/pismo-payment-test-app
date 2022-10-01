// check request body for the account
// The same script can be modified to check multiple body params for other apis

const { check } = require("express-validator");

exports.accounts = [
    check("document_number").not().isEmpty().withMessage("document number is required")
  ];