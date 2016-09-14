import axios from 'axios';
import drawMap from './drawMap';

let _config = null;
let _lastPointIndex = 0;

function drawHeatMapFromRemote(){
  loadPointsAndDraw();
}

function loadPointsAndDraw(){
  var getData = {
      project: _config.projectName,
      screen: _config.screen,
      limitLeft: _lastPointIndex,
      limitRight: _lastPointIndex + _config.getPointsBatch
  };

  axios.get(_config.getPointsUrl, {params:getData}).then(response =>{
    if(response.data.points.length > 0){
      drawMap.draw(response.data.points);
      _lastPointIndex = _lastPointIndex + response.data.points.length + 1
    }
  }).catch(error => {
    console.log(error);
  });

  setTimeout(loadPointsAndDraw, _config.getPointsInterval || 50);
}

export default config => {
  _config = config;
  drawHeatMapFromRemote();
}
