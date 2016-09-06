import * as actions from './actions';

let state = {
  recording: false,
  posting: false,
  recordedPoints: [],
  config: {
    onNewPoint: null,
    postPointsUrl: null
  }
}

function setConfig(configObj){
  if(configObj){
    state.config.onNewPoint = configObj.onNewPoint;
    state.config.postPointsUrl = configObj.postPointsUrl
  }
}

export default configObj => {

  setConfig(configObj);

  return {
    startRecording: () => { actions.startRecording(state) },
    stopRecording: () => { actions.stopRecording(state) },
    startPostingPoints: () => { actions.startPostingPoints(state) },
    stopPostingPoints: () => { actions.stopPostingPoints(state) },
    drawHeatMap: () => { actions.drawHeatMap(state) }
  }
}
