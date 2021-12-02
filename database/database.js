const sequelize = require('sequelize');

const connection = new sequelize('qea_database', 'root', 'lukinhass', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;