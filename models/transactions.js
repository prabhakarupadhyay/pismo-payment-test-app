
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
                transactions.findAll({raw: true }).then((data)=>{
                    transactionList(transactionTableData,transactionTableData.dataValues,data);
                })
            }
        },
        timestamps: true,
        // alias createdAt as EventDate
        createdAt: "EventDate", 
        // updatedAt not created 
        updatedAt: false, 
    });

    async function transactionList(transactionTableData,currentData,listOfTransaction){
        if(currentData.OperationType_ID !== 4){
            transactionTableData.dataValues['Balance'] = currentData.Amount;
        }else{
            for(let i in listOfTransaction){
                console.log(i)
                if(listOfTransaction[i].OperationType_ID !== 4 && listOfTransaction[i].Balance < 0){
                    temporaryBalance = listOfTransaction[i].Balance + currentData.Amount;
                    if(temporaryBalance <= 0){
                        transactions.update({"Balance":temporaryBalance},{where:{Transaction_ID:listOfTransaction[i].Transaction_ID}})
                        transactionTableData.dataValues.Balance = 0;
                        break;
                    }else{
                        transactionTableData.dataValues.Balance = temporaryBalance;
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