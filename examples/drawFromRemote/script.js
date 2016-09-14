var hmap = heatm({
  projectName:'default',
  getPointsUrl:'http://localhost:3000/getPoints',
  getPointsBatch: 50
});

document.getElementById('drawBtn').addEventListener('click', function(){
  hmap.drawHeatMapFromRemote();
});
