// this script creates connection to mysql using sequelize

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'test';
const config = require(`${__dirname}/../config/config.json`)[env];
let sequelize;

if (config) {
    sequelize = new Sequelize(config.database, config.username, config.password, {...config});
}

module.exports = sequelize;

