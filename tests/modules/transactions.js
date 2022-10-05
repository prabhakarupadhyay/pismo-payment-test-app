'use strict';
/***
    Dont have a delete endpoint so each time post request creates a row in the table it cant be deleted during test
****/

const { expect } = require('chai');
const api = require('../helper/api-request');
const config = require('../helper/config');

describe('pismo customer transaactions API Integration Tests', () => {
    
    describe('#get / /transactions', () => {
        it('Should get top 10 transaction data for accounts', async () => {
            const res = await api.get(`/transactions`);
            expect(res.statusCode).to.equal(201);
            expect(res.body[0]).to.have.own.property('Transaction_ID');
            expect(res.body[0]).to.have.own.property('Account_ID');
            expect(res.body[0]).to.have.own.property('OperationType_ID');
            expect(res.body[0]).to.have.own.property('Amount');
            expect(res.body[0]).to.have.own.property('EventDate');
        });
    });

    describe('#post / /transactions', () => {
        it('should create a new transaction for a customer account', async () => {
                let res = await api.post('/transactions', { account_id: config.accountId, operation_type_id: config.operationId, amount: config.amount});
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.own.property('Transaction_ID');
                expect(res.body).to.have.own.property('Account_ID');
                expect(res.body).to.have.own.property('OperationType_ID');
                expect(res.body).to.have.own.property('Amount');
                expect(res.body).to.have.own.property('EventDate');
        });
        it('should give / Account not present for transaction', async () => {
            const res = await api.postError(`/transactions`,{ account_id: config.wrongAccountId, operation_type_id: config.operationId, amount: config.amount});
            expect(res.statusCode).to.equal(502);
        });

        it('should give / Operation ID needs to be between 1 to 4', async () => {
            const res = await api.postError(`/transactions`,{ account_id: config.accountId, operation_type_id: config.wrongOperationId, amount: config.amount});
            expect(res.statusCode).to.equal(422);
        });
    });
});

