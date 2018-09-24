
 function ApplyEdit(id){
   // updating option not done]

  var question_id = "editQues_" + id;
  var meta_id = "editMeta_"+id ;
  var comment_id = "editComment_"+id;

  var question = document.getElementById(question_id).innerHTML;
  var meta = document.getElementById(meta_id).innerHTML;
  var comment = document.getElementById(comment_id).innerHTML;
  var optionA = document.getElementById("editOpA").innerHTML;
  var optionB = document.getElementById("editOpB").innerHTML;
  var optionC= document.getElementById("editOpC").innerHTML;
  var optionD= document.getElementById("editOpD").innerHTML;
  console.log(question + '==========' + meta + '===========' +comment  );
  var obj={
    id: id,
    question: question,
    meta: meta ,
    comment: comment
  };


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
  window.location.reload(true);
})
  .catch(err =>{
  // handle errr
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

    console.log(data);
    window.location.reload(true);
  })
    .catch(err =>{
    // handle errr
    console.error(err);
  });

  // write a code to talk with back end
}
