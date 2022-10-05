'use strict';
/***
    Dont have a delete endpoint so each time post request creates a row in the table it cant be deleted during test
****/

const { expect } = require('chai');
const api = require('../helper/api-request');
const config = require('../helper/config');

describe('pismo customer accounts API Integration Tests', () => {
    
    describe('#get / /accounts/:accountId', () => {
        it('should get accounts data for the specified account id ', async () => {
            const res = await api.get(`/accounts/${config.accountId}`);
            expect(res.body).to.have.own.property('account_id');
            expect(res.body).to.have.own.property('document_number');
        });
        it('should give / Account not present', async () => {
            const res = await api.getError(`/accounts/${config.wrongAccountId}`);
            expect(res.statusCode).to.equal(404);
        });
    });


    describe('#post / /accounts', () => {
        it('should create a new account with the document number', async () => {
            try{
                let res = await api.post('/accounts', { document_number: config.documentNumber});
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.own.property('Account_ID');
                expect(res.body).to.have.own.property('Document_Number');
            }catch(e){
                throw e
            }
        });
    });

});

