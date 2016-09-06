import drawMap from './drawMap';

let config = {
  newPointsCallback: null
}

let recordedPoints = [];

function addEvents(){
  window.onmousemove = null;
  window.onmousemove = event => {
    mouseMoved(event.clientX, event.clientY);
  }
}

function stopRecording(){
  window.onmousemove = null;
}

function mouseMoved(x, y){
  if(config.newPointsCallback){
    config.newPointsCallback(x, y);
  }
  recordedPoints.push({x,y});
}

function setConfig(configObj){
  if(configObj){
    config.newPointssCallback = configObj.newPointsCallback;
  }
}

export default configObj => {

  setConfig(configObj);

  return {
    startRecording: () => {
      addEvents();
    },

    stopRecording: () => {
      stopRecording();
    },

    drawHeatMap: () => {
      stopRecording();
      drawMap(recordedPoints);
    }
  }
}
