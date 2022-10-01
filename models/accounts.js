
'use strict';

module.exports = function (sequelize, DataTypes) {
    const accounts = sequelize.define('accounts', {
        Account_ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        Document_Number: { type: DataTypes.STRING }
    });

    accounts.tableName = 'accounts';
    accounts.associate = function (models) {
        accounts.hasMany(models.transactions, {
            foreignKey: 'Account_ID'
        });
    };
    return accounts;
};
