require("dotenv").config();
const mysql = require('mysql2');


const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_PRIVATE_DOMAIN}:3306/${process.env.MYSQL_DATABASE}`;

const pool = mysql.createPool(urlDB).promise();


module.exports = pool;

