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
    maxPointsToPost: null,
    postPointsInterval: 250,
    getPointsInterval: 250
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
    drawHeatMap: () => { actions.drawHeatMap(state) },
    drawHeatMapFromRemote: () => { actions.drawHeatMapFromRemote(state) },
  }
}
