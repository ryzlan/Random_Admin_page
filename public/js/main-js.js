
 function ApplyEdit(id,arr){

  var options= [];
  arr.forEach(function(data){
    var option_id = "editOp_"+data;
     var answer = document.getElementById(option_id).innerHTML;
     options.push({
       oid:data,
       answer:answer
     });
  })
  //console.log(options);

  var question_id = "editQues_" + id;
  var meta_id = "editMeta_"+id ;
  var comment_id = "editComment_"+id;

  var question = document.getElementById(question_id).innerHTML;
  var meta = document.getElementById(meta_id).innerHTML;
  var comment = document.getElementById(comment_id).innerHTML;

  //console.log(question + '==========' + meta + '===========' +comment + '==========' + options  );
  var obj={
    id: id,
    question: question,
    meta: meta ,
    comment: comment,
    options:options
  };
//
//
  fetch('update', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(obj)
})
  .then(res =>{
  if(res.ok) return res.json();
})
  .then(data =>{
    // handle confirmation
  console.log(data);

  $('#updateConfirm').modal('show');
  setTimeout(function(){
    window.location.reload(true);
  }, 3000);

  })
  .catch(err =>{
  // handle errr
  $('#showError').modal('show');
  console.error(err);
});

}


function ApplyDelete(id){
  // deleting options not done
  var obj = {id: id}




  fetch('delete', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(obj)
  })
    .then(res =>{
    if(res.ok) return res.json();
  })
  .then(data =>{
    // handle confirmation
    $('#deleteConfirm').modal('show');
    //console.log(data);

  setTimeout(function(){

    window.location.reload(true);
  }, 3000);

  })
  .catch(err =>{
    // handle errr
    //console.error(err);
    $('#showError').modal('show');
  });

  // write a code to talk with back end
}


function reload(){
  window.location.reload(true);
}
