
async function startUp(){
  var resi = await fetch('https://api.porashona.online/api/tracks');
  this.datay = await resi.json();
}


 function getvalfirst(sel)
{
  
  var id = sel.id.split('_')[1];
  
  $('#secondSelect_'+id).html("");
  $("#secondSelect_"+id).append(`<option value=""> ----  </option>`)
  
  var tracks = this.datay.filter((data)=> data.track_name === sel.value)[0];
  tracks.sub_tracks.forEach((ss)=>{
    $("#secondSelect_"+id).append(`<option value="${ss.name}"> ${ss.name}  </option>`)
  });

}

function getvalsecond(sel){
  var id = sel.id.split('_')[1];
  
  var first = document.getElementById('firstSelect_'+id).value;
  
  var tracks = this.datay.filter((data)=> data.track_name === first)[0];
 
  var second  = sel.value ;
  var subtrack = tracks.sub_tracks.filter((d)=> d.name == second)[0];  
  
  
  $('#thirdSelect_'+id).html("");
  $("#thirdSelect_"+id).append(`<option value=""> ----  </option>`);
  subtrack.subjects.forEach((s)=>{
    $("#thirdSelect_"+id).append(`<option value="${s.name}"> ${s.name}  </option>`);
  });   
}

function getvalthird(sel){
  var id = sel.id.split('_')[1];
  var first = document.getElementById('firstSelect_'+id).value;
  var tracks = this.datay.filter((data)=> data.track_name === first)[0];
  var second  = document.getElementById('secondSelect_'+id).value;
  var subtrack = tracks.sub_tracks.filter((d)=> d.name == second)[0];  

  var third = sel.value;
  var subject = subtrack.subjects.filter((d)=> d.name == third)[0];

  

  console.log(subject);
  console.log(second);
  console.log(first);
  
  
  
}

function ApplyTracks(id){
  var modal_id = '#tracksConfirm_'+id;
   var row_id='#row_'+id;



  var track = document.getElementById('firstSelect_'+id).value;
  //var tracks = this.datay.filter((data)=> data.track_name === first)[0];
  var subtrack  = document.getElementById('secondSelect_'+id).value;
  //var subtrack = tracks.sub_tracks.filter((d)=> d.name == second)[0];  

  var subject = document.getElementById('thirdSelect_'+id).value;
  //var subject = subtrack.subjects.filter((d)=> d.name == third)[0];
  $('#firstSelect_'+id).value = "";
  $('#secondSelect_'+id).html("");
  $('#thirdSelect_'+id).html("");
  if(!(track && subtrack && subject) ){
    $(modal_id).modal('hide');
    alert('NOT POSSIBLE HABIBI');
    return ;
  }else{
    console.log("called");
    
    var obj={
      id: id,
      track: track,
      subtrack: subtrack ,
      subject: subject,
    };
    fetch('tracks', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(obj)
    })
    .then(res =>{
      console.log(res);
      
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

  


  
  
  
}





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
