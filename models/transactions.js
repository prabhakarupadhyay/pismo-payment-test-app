
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
            beforeCreate(transactions){
                transactions.findbyPk({
                    where:{
                        Account_ID:1
                    }
                }).then((data)=>{
                    console.log(data)
                  //  return;
                  //  transactionList(data);
                }).catch((e)=>{
                    console.log(e)
                })
            }
        },
        timestamps: true,
        // alias createdAt as EventDate
        createdAt: "EventDate", 
        // updatedAt not created 
        updatedAt: false, 
    });

    async function transactionList(listOfTransaction){
        console.log("triggered")
        //get current balance
        let attributes  = listOfTransaction.attributes
        if(Object.keys(attributes).length == 0){
          //  return
        }else{
                for(let i in attributes){
                    if(attributes.OperationType_ID == 4){
                    if(attributes[i].Balance < 0){
                        let tempBalance = attributes[i].Balance
                        attributes[i].Balance += currentBal;
                        currentBal += tempBalance
                        if(currentBal <=0){
                            break;
                        }else{
                            continue;
                        }
                    }
                }
            }
            return;
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