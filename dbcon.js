var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_powdrild',
  password        : '5835',
  database        : 'cs340_powdrild'
});
module.exports.pool = pool;
