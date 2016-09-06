function updateCoords(x, y){
  var pointsSpan = document.getElementById('coords');

  pointsSpan.textContent = 'x: ' + x + ' y: '+ y;
}

var hmap = heatm({newPointsCallback:updateCoords});

hmap.startRecording();

document.getElementById('drawBtn').addEventListener('click', function(){
  hmap.drawHeatMap();
});
