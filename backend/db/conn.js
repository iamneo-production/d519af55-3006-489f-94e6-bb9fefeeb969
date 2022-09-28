var mysql      = require('mysql');
var connection = mysql.createPool({
  host     : 'localhost',
  port      : 3306,
  user     : 'root',
  password : 'examly',
  database: "PetPerfect"
});

connection.query("create database PetPerfect", )

module.exports = connection;
