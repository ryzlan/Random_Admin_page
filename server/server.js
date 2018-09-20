// server
var express = require('express');
var port = 8000;
var app = express();
const bodyParser = require('body-parser');


//starting server
app.listen(port, function(){
  console.log('app started!');
});



//data base setup
var mysql= require('mysql');
var pool = mysql.createPool({
  connectionLimit  : 100,
  host             : 'localhost',
  user             : 'root',
  password         :'',
  database         :'qadb',
  debug            : false

});

function handle_database(query, callback){

  pool.getConnection(function(err, connection){
    if(err){
      callback(true);
      return;
    }
    console.log('connected as id ' , connection.threadId);

    connection.query(query, function(err, result){
      connection.release();
      if(!err){
        callback(false, result );
      }

    });
    connection.on('error' , function(err){
      callback(true);
      return ;

    } )


  })
}




// single connection setup

// var connection = mysql.createConnection({
//     host    :'localhost',
//     user    : 'root',
//     password:'',
//     database:'qadb'
// });
//
// // connecting to database
// connection.connect(function(err){
//   if(!err){
//     console.log("Database is connected .... nn ");
//   }else  {
//     console.log("Error connecting database ...  nn ");
//     connection.end(); //this needs to be after every query
//   }
// });
// end ''

//setting up template engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));




// app routes with queries ** real router not set up
app.get("/", function(req, res ){
  var query = 'SELECT * from questions LIMIT 2';
  var data  = handle_database(query, function(err,data ){
    if(err){
      res.json({"code" : 100, "status" : "Error in Querying"});
      return;
    }

    console.log(data);
    var datas = data[0];
    res.render('pages/index', {datas:datas} );
  });

});
// cannot find data


app.get("/data" , function(req, res){
  let ques;
  let ans;
  connection.query('SELECT * from questions LIMIT 2', function(err, rows , fields){
    if(!err){
      console.log('the query went through ' );
      ques = rows ;
      ques.forEach(function(element) {
        console.log(element.id);
          connection.query('SELECT * from answers WHERE question_id='+ element.id +' LIMIT 5', function(err, rows , fields){
            if(!err){
              ans = rows ;
              console.log('query went second time', ans  );
              res.json({
                "question" : ques,
                "answer" : ans
              })

            }else{
              console.log('Error while performing query', err);
              res.json({"code" : 100, "status" : "Error while performing query" , "error" : err });
              return;
            }


          });

      });
    //  res.json(rows);
    }else {
      console.log('Error while performing query', err);
      res.json({"code" : 100, "status" : "Error while performing query" , "error" : err });
      return;
    }
  });
} );
