var express = require('express');
var mysql= require('mysql');

var connection = mysql.createConnection({
    host    :'localhost',
    user    : 'root',
    password:'',
    database:'qadb'
});

var app = express();

connection.connect(function(err){
  if(!err){
    console.log("Database is connected .... nn ");
  }else  {
    console.log("Error connecting database ...  nn ");
    connection.end();
  }
});

app.get("/" , function(req, res){
  connection.query('SELECT * from questions LIMIT 2', function(err, rows , fields){

    if(!err){
      console.log('The solution is ');
      res.json(rows);
    }else {
      console.log('Error while performing query', err);
      res.json({"code" : 100, "status" : "Error while performing query"})
      return;
    }
  });
} );

app.listen(3000);
