$( document ).ready(function() {
  let curr_call_uid = parseInt(localStorage.getItem("curr_call_uid"));
  var curr_call_name = USERS[curr_call_uid].name;

  $("#title").html("<h1>Your upcoming conversation with " + curr_call_name + "</h1>");
  $("#subtitle").html("<p class='lead'>Since this is your first time chatting with " + curr_call_name + ", here's a roadmap to get the conversation started!</p>");
});
