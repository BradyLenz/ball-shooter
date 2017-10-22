//Game Loop
function update(delta) {
  for(i = 0; i < myBalls.length; i++){
    myBalls[i].update(delta);
  }
}

function draw() {
  var canvas = document.getElementById('gameCanvas');
  var ctx = canvas.getContext('2d');
  scaleCanvas(canvas);
  //ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  for(i = 0; i < myBalls.length; i++){
    myBalls[i].draw(ctx);
  }

  if(launching){
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

function loop(timestamp) {
  if(lostFocus){
    lostFocus = false;
  }
  else{
    var delta = timestamp - lastRender;
    
    if(typeof myBalls != "undefined"){
      update(delta);
      draw();
    }
  }
  
  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
var lastRender = 0;
window.requestAnimationFrame(loop);