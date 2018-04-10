$( document ).ready(function() {
  loadState();
});

var loadState = function() {
  if (typeof(Storage) !== "undefined") {

  }
  else {
    console.log("No Web Storage support. Unable to save stickies.");
  }
}
