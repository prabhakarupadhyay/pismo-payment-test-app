const express = require("express");
const router = express.Router();
  
  //import validators
  const {
    accounts,
  } = require("../validators/checkRequestBody");
  const { runValidation } = require("../validators");


//Import accounts controllers
const {
  getAccount,
  createAccount,
} = require("../controllers/accounts");


//accounts apis
router.post("/", accounts, runValidation, createAccount);
router.get("/:accountId", getAccount);

module.exports = router;
