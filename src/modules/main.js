import * as actions from './actions';

let state = {
  recording: false,
  posting: false,
  recordedPoints: [],
  config: {
    projectName: 'default',
    onNewPoint: null,
    postPointsUrl: null,
    postPointsBatch: 50,
    maxPointsToDraw: null,
    maxPointsToPost: null
  }
}

function setConfig(configObj){
  if(configObj){
    state.config = configObj;
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
