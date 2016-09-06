function updateCoords(x, y){
  var coordsSpan = document.getElementById('coords');

  coordsSpan.textContent = 'x: ' + x + ' y: '+ y;
}

var hmap = heatm({newCoordsCallback:updateCoords});

hmap.startRecording();

document.getElementById('drawBtn').addEventListener('click', function(){
  hmap.drawHeatMap();
});
