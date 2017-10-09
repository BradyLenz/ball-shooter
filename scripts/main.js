document.addEventListener("DOMContentLoaded", function(){
  var canvas = document.getElementById('gameCanvas');
  var ctx = canvas.getContext('2d');
  var letters = "0123456789abcdef";
  for(i = 0; i < 1000; i++){
    var temp = Object.create(ball);
    temp.x = (Math.random() * (window.innerWidth - temp.radius * 4)) + temp.radius * 2;
    temp.y = (Math.random() * 500) - 1000;
    temp.vy = Math.random() * 50;

    var color = "#";
    for(j = 0; j < 6; j++){
      color += letters[Math.floor(Math.random() * 16)];
    }
    temp.color = color;
    myBalls.push(temp);
  }
});

var myBalls = [];

function scaleCanvas(ctx){
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

var ball = {
  radius: 20,
  color: "#000000",
  x: 0,
  y: 0,
  vy: 0,

  draw: function(ctx){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "black";
      ctx.stroke();
  },

  update: function(delta){
      var canvas = document.getElementById('gameCanvas');
      this.vy += 49 * delta / 1000;
      this.y += this.vy;
      
      if(this.y > canvas.height - this.radius * 2){
        if(this.vy < 0.5 && this.vy > 0){
          this.destroy();
        }
        this.y = canvas.height - this.radius * 2;
        this.vy = -this.vy * 0.9;
      }
  },

  destroy: function(){
    var index = myBalls.indexOf(this);
    myBalls.splice(index, 1);
    if(index == -1){
      console.log("breh");
    }
  }
};

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
  var delta = timestamp - lastRender

  update(delta)
  draw()

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)