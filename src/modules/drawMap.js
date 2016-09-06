import interpolateColor from './colorInterpolation';

const initialColor = {R:255, G:0, B:0, A:0};
const targetColor = {R:255, G:255, B:0, A:1};
const defColorIncrement = .4;
const defAlphaIncrement = .1;

let markedPoints = {};
let context = null;

function createCanvas(){

  var existingCanvas = document.getElementById('canvasHeatM');

  if(existingCanvas){
    existingCanvas.parentNode.removeChild(existingCanvas)
  }

  var canvas = document.createElement('canvas');
  canvas.id = "canvasHeatM";
  canvas.width = screen.availWidth;
  canvas.height = screen.availHeight;
  canvas.style.zIndex = 1000;
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;

  document.body.appendChild(canvas);
  context = canvas.getContext('2d');
}

function processPoints(x, y){
  paintDot(x, y, defColorIncrement, defAlphaIncrement);

  var aroundDots = [];
  var ratioLevel = 1;

  while (ratioLevel < 20) {
    var radioPoints = ratioLevel * 3;

    for(var j=0;j < radioPoints; j++){
      var xi = Math.cos(((Math.PI*2)/radioPoints)*j) * ratioLevel + x;
      var yi = Math.sin(((Math.PI*2)/radioPoints)*j) * ratioLevel + y;
      paintDot(xi, yi, defColorIncrement - (ratioLevel * 0.02), defAlphaIncrement - (ratioLevel * .01));
    }
    ratioLevel++;
  }
}

function paintDot(x, y, colorIncrement, alphaIncrement){
  var source = initialColor;
  var currentColor = markedPoints['dot' + x + y];

  if(currentColor){
    source = currentColor;
  }

  var newColor = interpolateColor(source, targetColor, colorIncrement, alphaIncrement);

  context.fillStyle = 'rgba(' + newColor.R + ','
    + newColor.G + ','
    + newColor.B + ','
    + newColor.A + ')';

  context.fillRect(x, y, 1, 1);

  markedPoints['dot' + x + y] = newColor;
}

function drawPoints(points, from, to){

  if(to >= points.length){
    to = points.length;
  }

  if(from >= points.length){
    return;
  }

  if(!to){
    to = points.length > 100 ? 50 : 100;
  }

  setTimeout(()=> {
    for (var i = from; i < to; i++) {
      processPoints(points[i].x, points[i].y);
    }
    drawPoints(points, from + 50, to + 50);
  }, 100);
}

export default points => {
  if(points && points.length > 0){
    createCanvas();
    drawPoints(points, 0);
  }
}
