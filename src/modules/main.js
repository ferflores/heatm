import drawMap from './drawMap';

let config = {
  newCoordsCallback: null
}

let recordedCoords = [];

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
  if(config.newCoordsCallback){
    config.newCoordsCallback(x, y);
  }
  recordedCoords.push({x,y});
}

function setConfig(configObj){
  if(configObj){
    config.newCoordsCallback = configObj.newCoordsCallback;
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
      drawMap(recordedCoords);
    }
  }
}
