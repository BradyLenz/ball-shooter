document.addEventListener("DOMContentLoaded", function(){
})

var startX = 0;
var startY = 0;
document.addEventListener("mousedown", function(e){
  launching = true;
  startX = e.clientX;
  startY = e.clientY;
})

var launching = false;
document.addEventListener("mouseup", function(e){
  if(launching){
    launching = false;
    launch(e.clientX, e.clientY);
  }
})

var currentX = 0;
var currentY = 0;
document.addEventListener("mousemove", function(e){
  currentX = e.clientX;
  currentY = e.clientY;
})

var lostFocus = false;
window.addEventListener("blur", function(){
  lostFocus = true;
})