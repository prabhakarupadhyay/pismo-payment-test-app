'use strict';

const app = require('./../../server');
const { expect } = require('chai');
const request = require('supertest');


module.exports = {


    post: (url, params) => {
        return request(app).post(url)
            .send(params)
            .then((res) => {
                expect(res.statusCode).to.oneOf([200, 201]);
                expect(res.body).to.be.an('object');
                expect(res.body).not.to.be.empty;
                return res;
            });
    },

    get: (url) => {
        return request(app).get(url)
            .then((res) => {
                expect(res.statusCode).to.oneOf([200, 201]);
                expect(res.body).not.to.be.empty;
                return res;
        });
    },


    postError: (url, params) => {
        return request(app).post(url)
            .send(params)
            .then((res) => {
                expect(res.statusCode).to.oneOf([502, 422]);
                return res;
            });
    },


    getError: (url) => {
        return request(app).get(url)
            .then((res) => {
                expect(res.statusCode).to.equal(404);
                return res;
            });
    }
};


