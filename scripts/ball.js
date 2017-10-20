var myBalls = [];

function spawn(x, y, vy, vx){
    var letters = "0123456789abcdef";
    var temp = Object.create(ball);
    temp.x = x;
    temp.y = y;
    temp.vy = vy;
  
    var color = "#";
    for(j = 0; j < 6; j++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    temp.color = color;
    myBalls.push(temp);
}

var ball = {
    radius: 20,
    color: "#000000",
    x: 0,
    y: 0,
    vy: 0,
    vx: 0,
  
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
}