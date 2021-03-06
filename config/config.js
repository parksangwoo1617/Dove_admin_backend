require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.PASSWORD,
    "database": "submit_dove",
    "host": "syxxn.cpqlwbmznveu.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql",
    "operatorsAliases": 0,
    "logging": true,
    "timezone": "+09:00"
  },
  "test": {
    "username": "root",
    "password": process.env.PASSWORD,
    "database": "submit_dove",
    "host": "syxxn.cpqlwbmznveu.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql",
    "operatorsAliases": 0,
    "timezone": "+09:00"
  },
  "production": {
    "username": "root",
    "password": process.env.PASSWORD,
    "database": "submit_dove",
    "host": "syxxn.cpqlwbmznveu.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql",
    "operatorsAliases": 0,
    "logging": false,
    "timezone": "+09:00"
  },
};
