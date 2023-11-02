const { Sequelize, DataTypes } = require('sequelize');
const mysql= new Sequelize('expense', 'root', 'Arti@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = mysql;



