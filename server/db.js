var mysql = require('mysql'),
    conf = require('./config');

var dbConnection = mysql.createConnection(conf.database);

dbConnection.connect();

module.exports = dbConnection;