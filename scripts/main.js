document.addEventListener("DOMContentLoaded", function(){
  myBalls = [];
})

var launching = false;
var startX = 0;
var startY = 0;
document.addEventListener("mousedown", function(e){
  launching = true;
  startX = e.clientX;
  startY = e.clientY;
})

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

var maxV = 500;
var maxVf = 50;
function launch(finalX, finalY){
  var x = startX - finalX;
  var y = startY - finalY;
  var theta = Math.atan(Math.abs(x/y));
  var v = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  v = Math.min(v, maxV);
  var vf = map(v, 0, maxV, 0, maxVf);
  //console.log(vf);

  var x2, y2 = 0;

  if(x > 0 && y > 0){
    x2 = Math.sin(theta) * maxVf;
    y2 = Math.cos(theta) * maxVf;
    console.log("1");
  }
  else if(x > 0 && y < 0){
    x2 = Math.sin(Math.PI - theta) * maxVf;
    y2 = Math.cos(Math.PI - theta) * maxVf;
    console.log("2");
  }
  else if(x < 0 && y < 0){
    x2 = Math.sin(theta + Math.PI) * maxVf;
    y2 = Math.cos(theta + Math.PI) * maxVf;
    console.log("3");
  }
  else if (x < 0 && y > 0){
    x2 = Math.sin(-theta) * maxVf;
    y2 = Math.cos(-theta) * maxVf;
    console.log("4");
  }

  spawn(startX, startY, x2, y2);
}

function map(x, iMin, iMax, oMin, oMax){
  return (((x - iMin) * (oMax - oMin)) / (iMax - iMin)) + oMin 
}

/*document.addEventListener("click", function(e){
  spawn(e.clientX, e.clientY, 0, 0);
})*/

var lostFocus = false;

window.addEventListener("blur", function(){
  lostFocus = true;
})

function scaleCanvas(canvas){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
  scaleCanvas(canvas);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

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
    
    update(delta);
    draw();
  }
  
  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
var lastRender = 0;
window.requestAnimationFrame(loop);