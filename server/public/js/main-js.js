
// function editQues(){
//   var edit
// }

 function ApplyEdit(id){
  var question_id = "editQues_" + id;
  var meta_id = "editMeta_"+id ;
  var comment_id = "editComment_"+id;


  var question = document.getElementById(question_id).innerHTML;
  var meta = document.getElementById(meta_id).innerHTML;
  var comment = document.getElementById(comment_id).innerHTML;
  // var optionA = document.getElementById("editOpA").innerHTML;
  // var optionB = document.getElementById("editOpB").innerHTML;
  // var optionC= document.getElementById("editOpC").innerHTML;
  // var optionD= document.getElementById("editOpD").innerHTML;
  console.log(question + '==========' + meta + '===========' +comment  );

  // write a code to comunicate with backend



}
function ApplyDelete(id){
  alert(id);

  // write a code to talk with back end
}
