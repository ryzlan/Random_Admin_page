
 function ApplyEdit(id,arr){
   var modal_id = '#updateConfirm_'+id;
   var row_id='#row_'+id;
   var list_id= '#list_'+id;




  var options= [];
//  console.log(arr);
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
//  console.log(obj);
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
    $(modal_id).modal('hide');
    $(row_id).addClass('tada animated');
  //  setTimeout(function(){ window.location.reload(true); }, 1000);
    //window.location.reload(true);
  })
  .catch(err =>{
  // handle errr
  $('#showError').modal('show');
  console.error(err);
});

}
var hide = function(elem) {

  // Give the element a height to change from
  elem.style.height = elem.scrollHeight + 'px';

  // Set the height back to 0
  window.setTimeout(function() {
    elem.style.height = '0';
  }, 1);

  // When the transition is complete, hide it
  window.setTimeout(function() {
    elem.classList.remove('is-visible');
  }, 350);

};


function ApplyDelete(id){
  // deleting options not done
  var obj = {id: id}
//  console.log(obj);
  var modal_id = '#deleteConfirm_'+id;
  var row_id='#row_'+id;
  var list_id= 'list_'+id;
  var list_elem= document.getElementById(list_id);

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
    $(modal_id).modal('hide');
    //$(row_id).addClass('hinge animated');
    $(row_id).addClass('bounceOutRight animated');
    setTimeout(function(){ hide(list_elem); }, 1000);

  //   window.location.reload(true);

  })
  .catch(err =>{
    // handle errr
    //console.error(err);
    $('#showError').modal('show');
  });

  // write a code to talk with back end
}
