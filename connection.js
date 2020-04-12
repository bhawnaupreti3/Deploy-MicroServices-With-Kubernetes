var mysql = require("mysql");

var con = mysql.createConnection({
    port: "3306",
    host: "localhost",
    user: "bhawna",
    password: "mysqlpw",
    database: "mysqldb"
  });
  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });
  con.end(function(err) {
    if(err) console.log('err: ', err);
    else console.log('Terminated done: ');
  });