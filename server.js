const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require('helmet');
require("dotenv").config();

// Import the sequelize object on which we have defined model
const sequelize = require('./models/connection');
const tables = require('./models/index');

// create tables if dont exist based on model
// use below object in sync function to drop and recreate tables
// {force:true}
sequelize.sync() 


//Import routes
const accounts = require("./routes/accounts");
const transactions = require("./routes/transactions");


//app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

//app routes
app.use("/accounts", accounts);
app.use("/transactions", transactions);

//
app.use(function (req, res, next) {
  console.log("Request: ", req.body);
  next();
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Api is running on port ${PORT}`);
});
