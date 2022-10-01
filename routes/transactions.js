const express = require("express");
const router = express.Router();
  
  //import validators
  const {
    transactions,
  } = require("../validators/checkRequestBody");
  const { runValidation } = require("../validators");


//Import accounts controllers
const {
  getTransactions,
  createTransaction,
} = require("../controllers/transactions");


//accounts apis
router.post("/", transactions, runValidation, createTransaction);
router.get("/", getTransactions);

module.exports = router;
