// server
var express = require('express');
var port = 8000;
var app = express();
const bodyParser = require('body-parser');


//starting server
app.listen(port, function(){
  console.log('app started!');
});

//setting up template engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




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


class Database {
  constructor(pool) {
  		this.pool = pool;
  	}
    query( sql ) {
        return new Promise( ( resolve, reject ) => {
            this.pool.query(sql,function( err, rows ){
                if ( err )
                    return reject( err );
                resolve( rows );
            });
        });
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.pool.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
const database = new Database(pool);

// app routes with queries ** real router not set up
app.get("/", function(req, res ){


var ques ,  ans = [];
var sql = 'SELECT * from questions LIMIT 2';
 database.query(sql)
  .then((results) =>{
    ques = results ;

    var promises = [];
      results.forEach((result)=>{
      var id = result.id;

      promises.push(answer_get(id));
      })//loop
        Promise.all(promises)
          .then((data)=>{
              ans= data;

          })
          .then(()=>{
            var arr =[] ;
            for(var i= 0 ; i <ques.length ; i++){
              arr.push({
                question : ques[i],
                answers : ans[i]
              });

            }


            // render data here
            res.render('pages/index', {datas:arr} )
            //  res.json(arr);
            //         <% include ../partials/rowdata %>

          })
          .catch((err)=>{
              res.send({"code" : 100, "status" : "Error in Reading database Answers", "error":err  })
          });
  }).catch((err)=>{
    res.send({"code" : 100, "status" : "Error in Reading database Question", "error":err  });
  });
function answer_get(id){
     return new Promise(function(resolve, reject){
       var new_sql = 'SELECT * FROM answers WHERE question_id='+id ;
       pool.query(new_sql, function(err, rows ){
         if ( err )
             return reject( err );
         resolve( rows );
       })

     })
}

  });


  //  handle_database(query, function(err,data ){
  //   if(err){
  //     res.json({"code" : 100, "status" : "Error in Reading from database"});
  //     return;
  //   }
  //   console.log(data);
  //
  //   data.forEach(function(datas){
  //      var id = datas.id;
  //      var new_query = 'SELECT * from answers WHERE question_id='+id ;
  //
  //      handle_database(new_query, function(err, result){
  //        if(err){
  //          res.json({"code" : 100, "status" : "Error in Reading from database"});
  //          return;
  //        }
  //        console.log(result);
  //        // obj.question = datas;
  //        // obj.answer.push(result);
  //        //
  //        // arr.push(obj);
  //
  //
  //      })
  //   })
  //
  //     //  res.render('pages/index', {datas:data} );
  // });




app.put("/update" , function(req, res) {
  var query = 'UPDATE questions SET question ="'+req.body.question +'" , meta ="'+req.body.meta+'", extra ="'+req.body.comment+'" WHERE id ='+req.body.id ;
  //console.log(query);
// handle updating answers

});




app.delete("/delete", function(req, res , next) {
  var question_id = req.body.id ;
  var query = 'DELETE FROM questions WHERE id='+question_id ;



//handle deleting all answers as well  onclick="ApplyDelete(<%= question.id %>)"
  console.log(query);



})
