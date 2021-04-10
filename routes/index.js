var express = require('express');
var router = express.Router();

//connection with db
var pg = require("pg");
require("dotenv").config();
const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_DB, POSTGRES_PW } = process.env;
var configDB = {
  user: POSTGRES_USER,
  database: POSTGRES_DB,
  password: POSTGRES_PW,
  host: POSTGRES_HOST,
  port: 5432,
  max: 100,
  idleTimeoutMills: 30000,
};

var pool = new pg.Pool(configDB);

/* GET home page. */
router.get('/fromdb', async (req, res, next) => {
  const response = await pool.query("SELECT * FROM testna");
  res.send(response.rows);
});

module.exports = router;
