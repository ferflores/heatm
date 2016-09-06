import interpolateColor from './colorInterpolation';

const initialColor = {R:255, G:0, B:0, A:0};
const targetColor = {R:255, G:255, B:0, A:1};
const defColorIncrement = .4;
const defAlphaIncrement = .1;

let markedCoords = {};
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

function processCoords(x, y){
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
  var currentColor = markedCoords['dot' + x + y];

  if(currentColor){
    source = currentColor;
  }

  var newColor = interpolateColor(source, targetColor, colorIncrement, alphaIncrement);

  context.fillStyle = 'rgba(' + newColor.R + ','
    + newColor.G + ','
    + newColor.B + ','
    + newColor.A + ')';

  context.fillRect(x, y, 1, 1);

  markedCoords['dot' + x + y] = newColor;
}

function drawCoords(coords){
  for (var i = 0; i < coords.length; i++) {
    processCoords(coords[i].x, coords[i].y);
  }
}

export default coords => {
  if(coords && coords.length > 0){
    createCanvas();
    drawCoords(coords);
  }
}
