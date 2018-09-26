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
}
const database = new Database(pool);

// pagination varaible
var totalRec = 0,
pageSize  = 6,
pageCount = 0;
var start       = 0;
var currentPage = 1;

// app routes with queries ** real router not set up
app.get("/", function(req, res ){
var count_query='SELECT COUNT(*) AS totalEntries FROM questions'
database.query(count_query)
  .then((result)=>{
    console.log(result[0].totalEntries);
    //pagination workk

    totalRec      =  result[0].totalEntries
    pageCount     =  Math.ceil(totalRec /  pageSize);

    if (typeof req.query.page !== 'undefined') {
      currentPage = req.query.page;
    }

    if(currentPage >1){
      start = (currentPage - 1) * pageSize;
    }

    var ques ,  ans = [];
    var sql = 'SELECT * FROM questions LIMIT '+pageSize+' OFFSET '+start;
    return database.query(sql);
 })
  .then((results) =>{
      ques = results ;

      var promises = [];
      results.forEach((result)=>{
          var id = result.id;
          promises.push(answer_get(id));
      })//loop
      return Promise.all(promises);
    })
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
        res.render('pages/index', {
          datas       : arr,
          pageSize    : pageSize,
          pageCount   : pageCount,
          currentPage : currentPage
          })
      })
      .catch((err)=>{
        res.send({"code" : 100, "status" : "Error in Reading database Answers", "error":err  })
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

app.put("/update" , function(req, res) {
  var query = 'UPDATE questions SET question ="'+req.body.question +'" , meta ="'+req.body.meta+'", extra ="'+req.body.comment+'" WHERE id ='+req.body.id ;
  var options = req.body.options;
  var promises= [];
  options.forEach(function(option){
  promises.push(update_all(option.oid, option.answer))  ;
  }) ;

  //console.log(query);
  // console.log(options);
  // console.log(promises);

  database.query(query)
  .then((result)=>{
    return Promise.all(promises);
  })
    .then((data)=>{
        console.log(data);
        res.send(data);
      })
      .catch((err)=>{
    console.log(err);
    res.send({"code" : 500, "status" : "Error in Updating question", "error":err})
    })


// handle updating answers
function update_all(id,answer){
     return new Promise(function(resolve, reject){
       var new_sql = 'UPDATE answers SET answer="'+answer+'" WHERE id ='+id;
       pool.query(new_sql, function(err, rows ){
         if ( err )
             return reject( err );
         resolve( rows );
       })

     })
}


});




app.delete("/delete", function(req, res , next) {
  var question_id = req.body.id ;
  var query = 'DELETE FROM questions WHERE id='+question_id ;
  var another = 'DELETE FROM answers WHERE question_id='+question_id;

  database.query(query)
  .then((result)=>{
    console.log(result);
    return database.query(another)
  })
  .then((result)=>{
    console.log(result);
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
    res.send({"code" : 500, "status" : "Error in Deleting", "error":err})
  });


//handle deleting all answers as well  onclick="ApplyDelete(<%= question.id %>)"
  console.log(query);



})
