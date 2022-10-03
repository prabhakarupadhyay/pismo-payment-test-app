const express = require("express");
const router = express.Router();
  
  //import validators
  const {
    transactions,
  } = require("../validators/checkRequestBody");
  const { runValidation } = require("../validators");

  //import helper function
  const decodeOperationsTypes= require("../helper-functions/operationsTypes");

//Import accounts controllers
const {
  getTransactions,
  createTransaction,
} = require("../controllers/transactions");


//accounts apis
router.post("/", transactions, runValidation, decodeOperationsTypes, createTransaction);
router.get("/", getTransactions);

module.exports = router;

