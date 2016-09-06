var hmap = heatm({postPointsUrl:'http://localhost:3000/setPoints'});

hmap.startRecording();

document.getElementById('drawBtn').addEventListener('click', function(){
  hmap.drawHeatMap();
});
