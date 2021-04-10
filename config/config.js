require("dotenv").config();
const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PW, POSTGRES_DB } = process.env;

module.exports = {
  "development": {
    "username": POSTGRES_USER,
    "password": POSTGRES_PW,
    "database": POSTGRES_DB,
    "host": POSTGRES_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};
