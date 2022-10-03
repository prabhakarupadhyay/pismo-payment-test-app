//sequelize transactions logic

const { transactions } = require('../models');
const sequelize = require('../models/connection');


// Get top 10 transactions from transactions table ordered by date
exports.getTransactions = async (req, res) => {
    return await transactions.findAll({ 
        limit: 10 ,
        order: [
            ['EventDate','DESC']
        ]
    })
    .then(function (transactions) {
        console.log(transactions)
        if (transactions) {
            res.status(201).json(transactions);
        } else if(transactions == null) {
            res.status(404).send('transactions not present');
        }else{
            res.status(500).send('Internal server error');
        }
    });
};

exports.createTransaction = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
          const transaction = await transactions.create({
            Account_ID: req.body.account_id,
            OperationType_ID: req.body.operation_type_id,
            Amount: req.body.amount
          }, { transaction: t });
          // `transaction` is whatever was returned from the transaction callback (the `transaction`, in this case)
          res.status(200).json(transaction)
        });
      } catch (error) {
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
          console.log(JSON.stringify(error))
          //This error occurs if transaction occurs for the account ID not present in accounts table
          if(error.name == "SequelizeForeignKeyConstraintError"){
            res.status(502).send('Account not present for transaction');
          }else{
            res.status(500).send('unsuccessfull transaction, rolling back');
          }
      }
};