
'use strict';

module.exports = function (sequelize, DataTypes) {
    const Transactions = sequelize.define('transactions', {
        Transaction_ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        Account_ID: { type: DataTypes.INTEGER },
        OperationType_ID: { type: DataTypes.INTEGER },
        Amount: {type: DataTypes.FLOAT, defaultValue: 0},
        Balance:{type: DataTypes.FLOAT}
    },
    {
        hooks:{
            beforeCreate(transactions){
                return new Promise((resolve, reject) => {
                    Transactions.findAll({raw: true }).then((data)=>{
                        transactionList(resolve,reject,transactions,data);
                    })
                });
            }
        },
        timestamps: true,
        // alias createdAt as EventDate
        createdAt: "EventDate", 
        // updatedAt not created 
        updatedAt: false, 
    });

    async function transactionList(resolve,reject,currentData,listOfTransaction){
        if(currentData.OperationType_ID !== 4){
            currentData.Balance = currentData.Amount;
            resolve(currentData)
        }else{
            let flag = true;
             for (let i in listOfTransaction){
                if(listOfTransaction[i].Balance < 0){
                    let temporaryBalance = listOfTransaction[i].Balance + currentData.Amount;
                    if(temporaryBalance <= 0){
                        flag = false;
                        await Transactions.update({"Balance":temporaryBalance},{where:{Transaction_ID:listOfTransaction[i].Transaction_ID}})
                        currentData.Balance = 0;
                        resolve(currentData)
                        break;
                    }else{
                        flag = false;
                        await Transactions.update({"Balance":0},{where:{Transaction_ID:listOfTransaction[i].Transaction_ID}})
                        currentData.Balance = temporaryBalance;
                        if(i == listOfTransaction.length-1){
                            resolve(currentData)
                            break;
                        }
                        continue;
                    }
            }
        }
        if(flag){
            currentData.Balance = currentData.Amount;
            resolve(currentData)
        }
        }
    }

    Transactions.tableName = 'transactions';
    Transactions.associate = function (models) {
        Transactions.belongsTo(models.accounts, {
            foreignKey: 'Account_ID'
        });
    };
    return Transactions;
};


// plus transaction -> comes into transaction table -> go through all the negative transactions of the account -> subtract the positive with the negative transactions
// per row -> check if the current amount is 0 -> if not move to second row and repeat