
'use strict';

module.exports = function (sequelize, DataTypes) {
    const transactions = sequelize.define('transactions', {
        Transaction_ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        Account_ID: { type: DataTypes.INTEGER },
        OperationType_ID: { type: DataTypes.INTEGER },
        Amount: {type: DataTypes.FLOAT, defaultValue: 0},
        Balance:{type: DataTypes.FLOAT}
    },
    {
        hooks:{
            beforeCreate(transactionTableData, options){
                transactions.findAll({ raw : true}).then((data)=>{
                transactionList(transactionTableData[0],data[0]);
                })
            }
        },
        timestamps: true,
        // alias createdAt as EventDate
        createdAt: "EventDate", 
        // updatedAt not created 
        updatedAt: false, 
    });

    async function transactionList(currentData,listOfTransaction){
        if(currentData.transactions.dataValues.OperationType_ID !== 4){
            currentData.transactions.dataValues['Balance'] = currentData.transactions.dataValues.Amount;
            return
        }else{
            for(let transaction in listOfTransaction){
                if(transaction.transactions.dataValues.OperationType_ID !== 4 && transaction.transactions.dataValues.Balance < 0){
                    temporaryBalance = transaction.transactions.dataValues.Balance + currentData.transactions.dataValues.Amount;
                    if(temporaryBalance <= 0){
                        transaction.transactions.dataValues.Balance = temporaryBalance;
                        currentData.transactions.dataValues.Balance = 0;
                        break;
                    }else{
                        currentData.transactions.dataValues.Balance = temporaryBalance;
                        continue;
                    }
            }
        }
        
        }
    }

    transactions.tableName = 'transactions';
    transactions.associate = function (models) {
        transactions.belongsTo(models.accounts, {
            foreignKey: 'Account_ID'
        });
    };
    return transactions;
};


// plus transaction -> comes into transaction table -> go through all the negative transactions of the account -> subtract the positive with the negative transactions
// per row -> check if the current amount is 0 -> if not move to second row and repeat