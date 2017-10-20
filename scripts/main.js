document.addEventListener("DOMContentLoaded", function(){

})

document.addEventListener("click", function(e){
  spawn(e.clientX, e.clientY, 0, 0);
})

var lostFocus = false;

window.addEventListener("blur", function(){
  lostFocus = true;
})

function scaleCanvas(ctx){
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

//Game Loop
function update(delta) {
  for(i = 0; i < myBalls.length; i++){
    myBalls[i].update(delta);
  }
}

function draw() {
  var canvas = document.getElementById('gameCanvas');
  var ctx = canvas.getContext('2d');
  scaleCanvas(ctx);

  for(i = 0; i < myBalls.length; i++){
    myBalls[i].draw(ctx);
  }
}

function loop(timestamp) {
  if(lostFocus){
    lostFocus = false;
  }
  else{
    var delta = timestamp - lastRender;
    
    update(delta);
    draw();
  }
  
  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
var lastRender = 0;
window.requestAnimationFrame(loop);