
'use strict';

module.exports = function (sequelize, DataTypes) {
    const transactions = sequelize.define('transactions', {
        Transaction_ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        Account_ID: { type: DataTypes.INTEGER },
        OperationType_ID: { type: DataTypes.INTEGER },
        Amount: {type: DataTypes.FLOAT, defaultValue: 0},
    },
    {
        timestamps: true,
        // alias createdAt as EventDate
        createdAt: "EventDate", 
        // updatedAt not created 
        updatedAt: false, 
    });

    transactions.tableName = 'transactions';
    transactions.associate = function (models) {
        transactions.belongsTo(models.accounts, {
            foreignKey: 'Account_ID'
        });
    };
    return transactions;
};
