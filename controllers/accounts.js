//sequelize accounts logic
const { accounts } = require('../models');

exports.getAccount = async (req, res) => {
    // Get account info stored in account table using account ID
    return await accounts.findByPk(req.params.accountId,{attributes: [
        ['Account_ID','account_id'],
        ['Document_Number','document_number']
     ]})
    .then(function (account) {
        if (account) {
            res.status(201).json(account);
        } else if(account == null) {
            res.status(404).send('Account not present');
        }else{
            res.status(500).send('Internal server error');
        }
    });
};

exports.createAccount = async (req, res) => {
        // Create account in accounts table
    return await accounts.create({
        Document_Number: req.body.document_number
    }).then(function (account) {
        if (account) {
            res.status(201).send(account);
        } else {
            res.status(400).send('Error creating account');
        }
    });
};

//accounts.update({data,{where:{id:post.id}hooks: true}}), 