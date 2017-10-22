function map(x, iMin, iMax, oMin, oMax){
    return (((x - iMin) * (oMax - oMin)) / (iMax - iMin)) + oMin 
}
  
function scaleCanvas(canvas){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}