import interpolateColor from './colorInterpolation';
import hmaps from 'heatmap.js';

let heatmap = null;
const initialColor = {R:255, G:0, B:0, A:0};
const targetColor = {R:255, G:255, B:0, A:1};
const defColorIncrement = .4;
const defAlphaIncrement = .1;

let drawPointsBatch = 50;
let markedPoints = {};
let context = null;

function createCanvas(){

  var existingCanvas = document.getElementById('heatmapContainer');

  if(existingCanvas){
    return;
  }

  var canvas = document.createElement('div');
  canvas.id = 'heatmapContainer'
  canvas.style.zIndex = 1000;
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%'
  canvas.style.height = '100%';
  document.body.style.margin = 0;
  document.body.style.padding = 0;
  document.body.appendChild(canvas);

  heatmap = hmaps.create({
    container: canvas
  });

  heatmap.setData({
    max:10
  });
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
    for (var i = from; i < to-1; i++) {
      heatmap.addData({ x: points[i].x, y: points[i].y, value: 1});
    }
    drawPoints(points, from + drawPointsBatch, to + drawPointsBatch);
  }, 100);
}

function drawByBatch (points, pointsBatch){
  createCanvas();

  if(points && points.length > 0){
    if(pointsBatch){
      drawPointsBatch = pointsBatch;
    }
    drawPoints(points, 0);
  }
}

function draw(points){
  createCanvas();
  for (var i = 0; i < points.length; i++) {
    heatmap.addData({ x: points[i].x, y: points[i].y, value: 1});
  }
}

export default {
  drawByBatch:drawByBatch,
  draw: draw
}
