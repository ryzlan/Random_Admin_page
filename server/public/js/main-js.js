
function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// fade in

function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
var Usucess = document.getElementById("updateSucess");
var Errror = document.getElementById("error");
var Dsucess = document.getElementById("deleteSucess");


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
  console.log(options);

  var question_id = "editQues_" + id;
  var meta_id = "editMeta_"+id ;
  var comment_id = "editComment_"+id;

  var question = document.getElementById(question_id).innerHTML;
  var meta = document.getElementById(meta_id).innerHTML;
  var comment = document.getElementById(comment_id).innerHTML;

  console.log(question + '==========' + meta + '===========' +comment + '==========' + options  );
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

  fadeIn(Usucess);
  setTimeout(function(){
    window.location.reload(true);
  }, 5000);

  })
  .catch(err =>{
  // handle errr
  fadeIn(Errror);
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

  fadeIn(Dsucess);
  setTimeout(function(){

    window.location.reload(true);
  }, 5000);

  })
  .catch(err =>{
    // handle errr
    console.error(err);
    fadeIn(Errror);
  });

  // write a code to talk with back end
}
